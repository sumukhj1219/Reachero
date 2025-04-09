"use client"
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

interface ResumeTitleSubmissionProps{
    submitTitle:(title:string)=>Promise<void>
}

const formSchema = z.object({
    title: z.string().min(2, { message: "Resume title must be atleast 2 characters." }).max(50),
})

const ResumeTitleSubmission = ({submitTitle}:ResumeTitleSubmissionProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true); 
        try {
            await submitTitle(values.title)
        } catch (error) {
            console.error("Error creating resume:", error);
        } finally {
            setIsLoading(false); 
            router.refresh()
        }
    }

    return (
        <div className='mt-2'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-muted-foreground'>Enter the title for your resume</FormLabel>
                                <FormControl>
                                    <Input placeholder="My-Resume" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant={'ocean'} type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ResumeTitleSubmission