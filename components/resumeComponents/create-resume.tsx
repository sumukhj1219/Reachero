import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import ResumeTitleSubmission from './resume-title-submission'
import { submitTitle } from '@/actions/submit-title'

const CreateResume = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className='hover:shadow bg-secondary w-70 h-70 m-4  rounded-xl flex items-center justify-center'>
                        <span className='flex items-center justify-center mx-auto'>
                            <Plus />
                        </span>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                            <ResumeTitleSubmission submitTitle={submitTitle} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateResume
