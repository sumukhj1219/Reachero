"use client";
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form, // You might not need this Form component directly anymore if FormProvider wraps everything
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useResumeStore from '@/context/resumeContext';

const projectFormSchema = z.object({
    projectName: z.string().min(1, { message: "Project name is required." }),
    description: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const Projects = () => {
    const { addEmptyProject, updateProject, projectDetails } = useResumeStore();
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
            <FormProvider {...form}> {/* Wrap with FormProvider */}
                {projectDetails.map((project) => (
                    <div key={project.id} className="mb-4 border p-4 rounded-md">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="projectName"
                                render={({ field }) => (
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
                                render={({ field }) => (
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
                            <Button type="button" variant="destructive" size="sm" onClick={() => {}}>
                                Remove
                            </Button>
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