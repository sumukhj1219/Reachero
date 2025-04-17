"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import PersonalDetails from './form-pages/personal-details';
import Education from './form-pages/education';
import Skills from './form-pages/skills';
import Experience from './form-pages/experience';
import Projects from './form-pages/projects';
import Achievements from './form-pages/achievements';
import axios from "axios"
import useResumeStore from '@/context/resumeContext';

const items = [
    { title: "Personal Details", component: <PersonalDetails /> },
    { title: "Education", component: <Education /> },
    { title: "Skills", component: <Skills /> },
    { title: "Experience", component: <Experience /> },
    { title: "Projects", component: <Projects /> },
    { title: "Achievements", component: <Achievements /> },
];

const ResumeForm = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const goToPreviousTab = () => {
        setCurrentTabIndex((prev) => Math.max(0, prev - 1));
    };

    const goToNextTab = () => {
        setCurrentTabIndex((prev) => Math.min(items.length - 1, prev + 1));
    };

    const currentTabTitle = items[currentTabIndex].title;

    return (
        <div className="space-y-6">
            <Tabs value={currentTabTitle} onValueChange={(value) => setCurrentTabIndex(items.findIndex(item => item.title === value))}>
                <TabsList>
                    {items.map((item) => (
                        <TabsTrigger key={item.title} value={item.title}>
                            {item.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {items.map((item, index) => (
                    <TabsContent key={item.title} value={item.title}>
                        {item.component}
                    </TabsContent>
                ))}
            </Tabs>

            <div className="flex justify-between">
                <Button variant="outline" onClick={goToPreviousTab} disabled={currentTabIndex === 0}>
                    Previous
                </Button>
                <Button onClick={goToNextTab} disabled={currentTabIndex === items.length - 1}>
                    Next
                </Button>
            </div>

            {currentTabIndex === items.length - 1 && (
    <Button
        type="submit"
        className="w-full"
        onClick={async () => {
            const {
                firstName,
                lastName,
                email,
                phone,
                city,
                state,
                country,
                educationDetails,
                experienceDetails,
                projectDetails,
                skills,
                achievements
            } = useResumeStore.getState();

            const resumeData = {
                firstName,
                lastName,
                email,
                phone,
                city,
                state,
                country,
                educationDetails,
                experienceDetails,
                projectDetails,
                skills,
                achievements
            };

            try {
                const res = await axios.post("/api/submit-resume", resumeData);
                console.log("Resume submitted successfully", res.data);
            } catch (error) {
                console.error("Error submitting resume:", error);
            }
        }}
    >
        Submit Resume
    </Button>
)}

        </div>
    );
};

export default ResumeForm;