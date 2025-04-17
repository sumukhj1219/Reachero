"use client";
import React, { useRef } from 'react';
import useResumeStore from '@/context/resumeContext';
import { Separator } from '../ui/separator';
import { jsPDF } from 'jspdf';
import { Button } from '../ui/button';
import html2canvas from 'html2canvas';

const ResumePreview = () => {
    const resumeRef = useRef<HTMLDivElement>(null);
    const { firstName, lastName, city, state, country, phone, email, educationDetails, skills, experienceDetails, projectDetails, achievements } = useResumeStore();

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



    const handleDownloadPDF = async () => {
        if (resumeRef.current) {
            console.log("resumeRef.current:", resumeRef.current);

            try {
                const canvas = await html2canvas(resumeRef.current, { scale: 4, logging: true });
                console.log("Canvas width:", canvas.width, "height:", canvas.height);
                const imgData = canvas.toDataURL('image/png');
                console.log("ImageData:", imgData ? imgData.substring(0, 100) + "..." : "Empty ImageData");

                const doc = new jsPDF();
                doc.addImage(imgData, 'PNG', 10, 10, 190, (190 * canvas.height) / canvas.width);
                doc.save(`${firstName}_${lastName}_resume.pdf`);

            } catch (error) {
                console.error("Error during PDF generation:", error);
            }

        }

    };


    const formatDate = (date: Date | undefined, format: 'MM/YYYY' | 'YYYY') => {
        if (!date) return '';
        const d = new Date(date);
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear().toString();
        return format === 'MM/YYYY' ? `${month}/${year}` : year;
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button onClick={handleDownloadPDF} size={'sm'}>
                    Download as PDF
                </Button>
            </div>
            <div ref={resumeRef}>
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
                                {exp.startDate || exp.endDate ? (
                                    <span className="text-sm">
                                        {exp.startDate && formatDate(exp.startDate, 'MM/YYYY')} -
                                        {exp.endDate ? formatDate(exp.endDate, 'MM/YYYY') : ' Present'}
                                    </span>
                                ) : null}
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

                {projectDetails && projectDetails.length > 0 ? (
                    projectDetails.map((project, index) => (
                        <div key={index} className="mt-1">
                            <span className="font-semibold">{project.projectName}:</span>
                            {project.description && (
                                <ul className="list-disc pl-5 mt-1 text-sm">
                                    {project.description.split('\n').map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="mt-4 text-sm text-muted-foreground">No projects added.</p>
                )}

                <div className="mt-4">
                    <Separator className="bg-black" />
                    <span className="font-semibold text-lg">ACHIEVEMENTS</span>
                    <Separator className="bg-black" />
                </div>

                {achievements && achievements.length > 0 ? (
                    <ul className="list-disc pl-5 mt-1 text-sm">
                        {achievements.map((achievement, index) => (
                            <li key={index} className="mb-2">
                                <span className="font-semibold">{achievement.title}</span>
                                <p className="text-sm">{achievement.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 text-sm text-muted-foreground">No achievements added.</p>
                )}


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