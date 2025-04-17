"use client";
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useResumeStore from '@/context/resumeContext';
import { Sparkles } from 'lucide-react';
import { improveProjectWithAI } from '../ai/improve-project'; 

const projectFormSchema = z.object({
    projectName: z.string().min(1, { message: "Project name is required." }),
    description: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const Projects = () => {
    const { addEmptyProject, updateProject, removeProject, projectDetails } = useResumeStore();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            projectName: "",
            description: "",
        },
    });

    const handleInputChange = (id: string, name: any, value: any) => {
        updateProject(id, { [name]: value });
    };

    return (
        <div>
            <h2>Projects</h2>
            <FormProvider {...form}>
                {projectDetails.map((project) => (
                    <div key={project.id} className="mb-4 border p-4 rounded-md">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="projectName"
                                render={() => (
                                    <FormItem>
                                        <FormLabel htmlFor={`projectName-${project.id}`}>Project Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                id={`projectName-${project.id}`}
                                                placeholder="e.g., Portfolio Website"
                                                value={project.projectName || ""}
                                                onChange={(e) => handleInputChange(project.id, 'projectName', e.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={() => (
                                    <FormItem>
                                        <FormLabel htmlFor={`description-${project.id}`}>Description (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                id={`description-${project.id}`}
                                                placeholder="Brief description of the project"
                                                rows={3}
                                                value={project.description || ""}
                                                onChange={(e) => handleInputChange(project.id, 'description', e.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center justify-between">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeProject(project.id)}
                                >
                                    Remove
                                </Button>

                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ocean"
                                    className="rounded-full text-yellow-300 shadow-md"
                                    disabled={loadingId === project.id}
                                    onClick={async () => {
                                        setLoadingId(project.id);
                                        const improved = await improveProjectWithAI(project);
                                        updateProject(project.id, improved);
                                        setLoadingId(null);
                                    }}
                                    title="Enhance with AI"
                                >
                                    {loadingId === project.id ? (
                                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-yellow-300 border-t-transparent" />
                                    ) : (
                                        <Sparkles className="h-3 w-3" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </FormProvider>
            <Button type="button" size={'sm'} onClick={addEmptyProject}>
                Add New Project
            </Button>
        </div>
    );
};

export default Projects;
