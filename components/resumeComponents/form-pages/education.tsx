import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Control } from "react-hook-form";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useResumeStore from "@/context/resumeContext"
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const formSchema = z.object({
  educations: z.array(
    z.object({
      degree: z.string().min(2, { message: "Degree must be at least 1 character." }),
      school: z.string().min(2, { message: "School must be at least 2 characters." }),
      startDate: z.date(),
      endDate: z.date(),
      cgpa: z.string().min(1, { message: "Cgpa is required." })
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface EducationFormProps {
  control: Control<FormValues>;
  index: number;
}

const EducationForm: React.FC<EducationFormProps> = ({ control, index }) => {

  return (
    <div className="grid grid-cols-2 gap-4 p-4 rounded-md mb-4">
      <FormField
        control={control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Bachelor of Science" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input placeholder="e.g., University of Example" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`educations.${index}.startDate`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Start Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Input
                    placeholder="Enter Start Date"
                    className={cn(
                      "bg-white text-sm font-medium pl-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      !field.value && "text-muted-foreground"
                    )}
                    {...field}
                    value={field.value ? format(field.value, "PPP") : ""}
                  />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <Calendar
                  mode="single"
                  onSelect={field.onChange}
                  initialFocus
                  defaultMonth={field.value}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`educations.${index}.endDate`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>End Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Input
                    placeholder="Enter End Date"
                    className={cn(
                      "bg-white text-sm font-medium pl-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      !field.value && "text-muted-foreground"
                    )}
                    {...field}
                    value={field.value ? format(field.value, "PPP") : ""}
                  />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <Calendar
                  mode="single"
                  onSelect={field.onChange}
                  initialFocus
                  defaultMonth={field.value}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`educations.${index}.cgpa`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cgpa</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 8.9" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const Education = () => {
  const { setEducationDetails, educationDetails } = useResumeStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      educations: educationDetails.length > 0 ? educationDetails : [{ degree: "", school: "", startDate: undefined, endDate: undefined, cgpa: "" }],
    },
  });

  const { control, handleSubmit, watch } = form;
  const { fields, append } = useFieldArray({
    control,
    name: "educations",
  });

  const updateEducationDetails = (values: FormValues) => {
    setEducationDetails(values.educations);
  };

  useEffect(() => {
    const subscription = watch((value) => updateEducationDetails(form.getValues()));

    return () => subscription.unsubscribe();
  }, [watch, setEducationDetails, form]);


  return (
    <Form {...form}>
      <form className="w-full max-w-4xl text-sm mx-auto">

        {fields.map((field, index) => (
          <EducationForm
            key={field.id}
            control={control}
            index={index}
          />
        ))}

        <Button type="button" onClick={() => append({ degree: "", school: "", startDate: undefined, endDate: undefined, cgpa: "" })} className="mt-4">
          Add New Education
        </Button>
      </form>
    </Form>
  );
};

export default Education