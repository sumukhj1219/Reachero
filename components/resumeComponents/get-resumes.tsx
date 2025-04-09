"use server"
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { format } from 'date-fns';
import { Badge } from "../ui/badge";
import Link from "next/link";

const GetResumes = async () => {
    const user = await currentUser();

    if (!user?.emailAddresses[0].emailAddress) {
        return <div>Not authenticated.</div>;
    }

    try {
        const userResume = await prisma.user.findUnique({
            where: { email: user.emailAddresses[0].emailAddress },
            include: { resumes: true },
        });

        return (
            <div >
                {userResume?.resumes?.map((resume) => (
                    <div key={resume.id} className='hover:shadow  flex flex-col items-start m-4 justify-between bg-blue-300 w-70 h-70  rounded-xl '>
                        <Badge variant={'secondary'} className="font-bold  text-2xl m-4 p-3">{resume.title}</Badge>
                        <div className="flex items-center justify-between">
                            <Badge variant={'secondary'} className="text-sm font-bold text-muted-foreground m-4">
                                {format(new Date(resume.createdAt), 'dd-MM-yyyy')}
                            </Badge>
                            <Link href={`/resume/${resume.id}`} className="cursor-pointer">
                                <Badge variant={'default'} className="text-sm font-bold text-muted-foreground m-4">
                                    Edit Resume
                                </Badge>
                            </Link>
                        </div>
                    </div>
                ))}
                {!userResume?.resumes?.length && <div>No resumes found.</div>}
            </div>
        );
    } catch (error) {
        console.error("Error fetching resumes:", error);
        return <div>Failed to load resumes.</div>;
    }
};

export default GetResumes;