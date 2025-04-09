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
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    city: z.string().min(2, { message: "City name must be at least 2 characters." }),
    state: z.string().min(2, { message: "State name must be at least 2 characters." }),
    country: z.string().min(2, { message: "Country name must be at least 2 characters." }),
});

const PersonalDetails = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // Remove defaultValues that depend on the store for reactivity
    });

    const {
        firstName,
        lastName,
        email,
        phone,
        city,
        state,
        country,
        setFirstName,
        setLastName,
        setEmail,
        setPhone,
        setCity,
        setState,
        setCountry,
    } = useResumeStore();

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form Values:", values);
        console.log("Store State:", useResumeStore.getState());
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid grid-cols-2 gap-x-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm'>First name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John"
                                        value={firstName} 
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFirstName(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription className='text-xs'>Enter your first name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm'>Last name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Doe"
                                        value={lastName} 
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setLastName(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription className='text-xs'>Enter your last name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm'>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="john.doe@example.com"
                                        type="email"
                                        value={email} 
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription className='text-xs'>Enter your email address.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm'>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="9876543210"
                                        type="tel"
                                        value={phone} 
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setPhone(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription className='text-xs'>Enter your 10-digit phone number.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm'>City</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="New York"
                                        value={city} 
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setCity(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription className='text-xs'>Enter your city.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm'>State</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="California"
                                        value={state} 
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setState(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription className='text-xs'>Enter your state.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm'>Country</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="United States"
                                        value={country} 
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setCountry(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription className='text-xs'>Enter your country.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="col-span-2">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default PersonalDetails;