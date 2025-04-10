import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useResumeStore from "@/context/resumeContext";

const Experience = () => {
    const { experienceDetails, addEmptyExperience, removeExperience, updateExperience } = useResumeStore();

    const handleInputChange = (id: string, name: any, value: any) => {
        updateExperience(id, { [name]: value });
    };

    const handleDateChange = (id: string, name: any, value: string | undefined) => {
        updateExperience(id, { [name]: value ? new Date(value) : undefined });
    };

    return (
        <div>
            {experienceDetails.map((experience) => (
                <div key={experience.id} className="mb-4 p-4 rounded-md">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor={`company-${experience.id}`}>Company</Label>
                            <Input
                                id={`company-${experience.id}`}
                                name="company"
                                value={experience.company || ""}
                                onChange={(e) => handleInputChange(experience.id, 'company', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`position-${experience.id}`}>Position</Label>
                            <Input
                                id={`position-${experience.id}`}
                                name="position"
                                value={experience.position || ""}
                                onChange={(e) => handleInputChange(experience.id, 'position', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                                <Input
                                    type="date"
                                    id={`startDate-${experience.id}`}
                                    name="startDate"
                                    value={experience.startDate?.toISOString().split('T')[0] || ""}
                                    onChange={(e) => handleDateChange(experience.id, 'startDate', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`endDate-${experience.id}`}>End Date (Optional)</Label>
                                <Input
                                    type="date"
                                    id={`endDate-${experience.id}`}
                                    name="endDate"
                                    value={experience.endDate?.toISOString().split('T')[0] || ""}
                                    onChange={(e) => handleDateChange(experience.id, 'endDate', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`description-${experience.id}`}>Description</Label>
                            <Textarea
                                id={`description-${experience.id}`}
                                name="description"
                                value={experience.description || ""}
                                onChange={(e) => handleInputChange(experience.id, 'description', e.target.value)}
                            />
                        </div>
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeExperience(experience.id)}>
                            Remove
                        </Button>
                    </div>
                </div>
            ))}
            <Button type="button" size={'sm'} onClick={addEmptyExperience}>
                Add New Experience
            </Button>
        </div>
    );
};

export default Experience;