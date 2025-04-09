"use client"
import React from 'react';
import useResumeStore from '@/context/resumeContext';
import { Separator } from '../ui/separator';

const ResumePreview = () => {
  const { firstName, lastName, city, state, country, phone, email, educationDetails } = useResumeStore();

  const locationInfo = [
    city,
    state,
    country,
  ].filter(Boolean).join(' , ');

  const contactInfo = [
    phone,
    email
  ].filter(Boolean).join(' | ');

  const combinedInfo = [
    locationInfo,
    contactInfo,
  ].filter(Boolean).join(' | ');

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

      <div className="mt-4">
        <Separator className="bg-black" />
        <span className="font-semibold text-lg">EXPERIENCE</span>
        <Separator className="bg-black" />
      </div>

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

export default ResumePreview;