"use server"

import { prisma } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

export async function submitTitle(title: string) {
    const user = await currentUser()
    if (!user?.emailAddresses[0].emailAddress) {
        throw new Error("Unauthourized user")
    }
    try {
        await prisma.user.upsert({
            create: {
                email: user?.emailAddresses[0].emailAddress || "",
                resumes: {
                    create: {
                        title: title,
                    },
                },
            },
            update: {
                resumes: {
                    create: {
                        title: title,
                    },
                },
            },
            where: {
                email: user?.emailAddresses[0].emailAddress || "",
            },
        });
    } catch (error) {
        throw new Error("Error in submitting title");
    }
}