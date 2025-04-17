'use client';

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

import useResumeStore from '@/context/resumeContext';
import { improveAchievementWithAI } from '../ai/improve-achievements';

const achievementSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});

type AchievementFormValues = z.infer<typeof achievementSchema>;

export default function Achievements() {
    const {
        achievements,
        addAchievement,
        updateAchievement,
        deleteAchievement,
    } = useResumeStore();

    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

    const form = useForm<AchievementFormValues>({
        resolver: zodResolver(achievementSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const handleInputChange = (id: string, name: keyof AchievementFormValues, value: string) => {
        updateAchievement(id, { [name]: value });
    };

    const handleAdd = () => {
        const id = uuidv4();
        addAchievement({
            title: '',
            description: '',
        });
    };

    const handleImproveClick = async (achievement: any) => {
        setLoadingMap(prev => ({ ...prev, [achievement.id]: true }));
        try {
            const improved = await improveAchievementWithAI(achievement);
            updateAchievement(achievement.id, improved);
        } catch (error) {
            console.error("AI improvement failed:", error);
        }
        setLoadingMap(prev => ({ ...prev, [achievement.id]: false }));
    };

    return (
        <div className="space-y-6">
            <FormProvider {...form}>
                {achievements.map((achievement) => (
                    <div key={achievement.id} className="rounded-xl space-y-4 border p-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={() => (
                                <FormItem>
                                    <FormLabel htmlFor={`title-${achievement.id}`}>Achievement</FormLabel>
                                    <FormControl>
                                        <Input
                                            id={`title-${achievement.id}`}
                                            value={achievement.title}
                                            onChange={(e) =>
                                                handleInputChange(achievement.id, 'title', e.target.value)
                                            }
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
                                    <FormLabel htmlFor={`description-${achievement.id}`}>Describe it shortly</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id={`description-${achievement.id}`}
                                            value={achievement.description}
                                            onChange={(e) =>
                                                handleInputChange(achievement.id, 'description', e.target.value)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between items-center">
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteAchievement(achievement.id)}
                            >
                                Delete
                            </Button>

                            <Button
                                type="button"
                                size="icon"
                                variant="ocean"
                                className="rounded-full text-yellow-300 shadow-md"
                                disabled={loadingMap[achievement.id]}
                                onClick={() => handleImproveClick(achievement)}
                                title="Enhance with AI"
                            >
                                {loadingMap[achievement.id] ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                    <Sparkles className="h-3 w-3" />
                                )}
                            </Button>
                        </div>
                    </div>
                ))}

                <Button size={'sm'} onClick={handleAdd}>Add Achievement</Button>
            </FormProvider>
        </div>
    );
}
