"use client"
import React from 'react';
import useResumeStore from '@/context/resumeContext';
import { Separator } from '../ui/separator';
// import { formatDate } from '@/lib/utils'; // Assuming you have a utility function for date formatting

const ResumePreview = () => {
    const { firstName, lastName, city, state, country, phone, email, educationDetails, skills, experienceDetails } = useResumeStore();

    const locationInfo = [city, state, country].filter(Boolean).join(' , ');
    const contactInfo = [phone, email].filter(Boolean).join(' | ');
    const combinedInfo = [locationInfo, contactInfo].filter(Boolean).join(' | ');

    const groupedSkills = skills.reduce((acc, skillObj) => {
        const { category, skill } = skillObj;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
    }, {} as { [key: string]: string[] });

    return (
        <div>
            <div className="flex flex-col items-center justify-center mb-2">
                <span className="font-bold text-xl">{firstName} {lastName}</span>
                <div className="flex items-center justify-center text-sm font-medium">
                    <span>{combinedInfo}</span>
                </div>
            </div>

            <div className="mt-4">
                <Separator className="bg-black" />
                <span className="font-semibold text-lg">EDUCATION</span>
                <Separator className="bg-black" />
            </div>

            {educationDetails && educationDetails.length > 0 ? (
                educationDetails.map((edu, index) => (
                    <div key={index} className="mt-1">
                        <div className="flex justify-between items-baseline">
                            <span className="font-semibold">{edu.school}</span>
                            <span>
                                {edu.startDate && `${new Date(edu.startDate).getFullYear()} - `}
                                {edu.endDate ? `${new Date(edu.endDate).getFullYear()}` : 'Present'}
                            </span>
                        </div>
                        <span className="text-sm">{edu.degree}</span>
                        {edu.cgpa && <span className="text-sm ml-5">CGPA: {edu.cgpa} / 10</span>}
                    </div>
                ))
            ) : (
                <p className="mt-4 text-sm text-muted-foreground">No education details added.</p>
            )}

            <div className="mt-4">
                <Separator className="bg-black" />
                <span className="font-semibold text-lg">SKILLS</span>
                <Separator className="bg-black" />
            </div>

            {Object.keys(groupedSkills).length > 0 ? (
                Object.keys(groupedSkills).map((category, index) => (
                    <div key={index} >
                        <span className="font-semibold">{category}:</span>
                        <span className="text-sm ml-2">{groupedSkills[category]?.join(', ')}.</span>
                    </div>
                ))
            ) : (
                <p className="mt-4 text-sm text-muted-foreground">No skills added.</p>
            )}

            <div className="mt-4">
                <Separator className="bg-black" />
                <span className="font-semibold text-lg">EXPERIENCE</span>
                <Separator className="bg-black" />
            </div>

            {experienceDetails && experienceDetails.length > 0 ? (
    experienceDetails.map((exp, index) => (
        <div key={index} className="mt-1">
            <div className="flex justify-between items-baseline">
                <span className="font-semibold">{exp.company}</span>
                <span className="text-sm italic">{exp.position}</span>
                <span className="text-sm">
                    {exp.startDate && formatDate(exp.startDate, 'MM/YYYY')} -
                    {exp.endDate ? formatDate(exp.endDate, 'MM/YYYY') : ' Present'}
                </span>
            </div>
            {exp.description && (
                <ul className="list-disc pl-5 mt-1 text-sm">
                    {exp.description.split('\n').map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    ))
) : (
    <p className="mt-4 text-sm text-muted-foreground">No experience details added.</p>
)}

            <div className="mt-4">
                <Separator className="bg-black" />
                <span className="font-semibold text-lg">PROJECTS</span>
                <Separator className="bg-black" />
            </div>

            <div className="mt-4">
                <Separator className="bg-black" />
                <span className="font-semibold text-lg">ACHIEVEMENTS</span>
                <Separator className="bg-black" />
            </div>
        </div>
    );
};

const formatDate = (date: Date | undefined, format: 'MM/YYYY' | 'YYYY') => {
    if (!date) return '';
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString();
    return format === 'MM/YYYY' ? `${month}/${year}` : year;
};

export default ResumePreview;