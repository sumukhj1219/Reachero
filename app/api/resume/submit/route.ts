import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
 

    if (!user) {
      return new Response("Unauthourized user", { status: 401 });
    }

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
      achievements,
      resumeId
    } = await req.json();

    const emailID = user.emailAddresses[0].emailAddress;

    const existingUser = await prisma.user.findUnique({
      where: { email: emailID }
    });

    if (!existingUser) {
      return NextResponse.json({ message: "Unauthourized user" }, { status: 401 });
    }

    const newResume = await prisma.resume.update({
      where: { id:resumeId },
      data: {
        firstName,
        lastName,
        email,
        phone,
        city,
        state,
        country,
        userId:existingUser.id,
        educations: {
          create: educationDetails.map((edu: any) => ({
            degree: edu.degree,
            school: edu.school,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
            cgpa: edu.cgpa
          }))
        },
        workExperiences: {
          create: experienceDetails.map((exp: any) => ({
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
            description: exp.description
          }))
        },
        projects: {
          create: projectDetails.map((proj: any) => ({
            projectName: proj.projectName,
            description: proj.description
          }))
        },
        skills: {
          create: skills.map((s: any) => ({
            skill: s.skill,
            category: s.category
          }))
        },
        achievements: {
          create: achievements.map((ach: any) => ({
            title: ach.title,
            description: ach.description
          }))
        }
      }
    });

    return NextResponse.json({ message: "saved" }, { status: 200 });

  } catch (error) {
    console.error("Resume submit error:", error);
    return NextResponse.json({ message: "Failed to submit resume" }, { status: 500 });
  }
}

