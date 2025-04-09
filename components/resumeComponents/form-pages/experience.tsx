import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useResumeStore from "@/context/resumeContext"


const formSchema = z.object({
  degree: z.string().min(2, { message: "Degree must be at least 1 character." }),
  school: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  startDate: z.date(),
  endDate: z.date()
});
// degree String?
//   school String?
//   startDate DateTime?
//   endDate DateTime?
const Experience = () => {
  return (
    <div>
      experience
    </div>
  )
}

export default Experience
