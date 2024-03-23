"use client"
<<<<<<< Updated upstream

import { SectionCreate } from './sections';
import { CollaboratorsSelect } from './collaborators';
import {Button} from '@/components/ui/button'

export default function Page(){
    // const [titleValue, setTitleValue] = useState('');
=======
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
})

export function ProfileForm({ onSubmit }) {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
      },
    })

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                    This is your public display name.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit">Submit</Button>
        </form>
    )
}

export default function Page(){
    const [titleValue, setTitleValue] = useState('');

    function handleFormSubmit(values) {
        console.log(values);
    }
>>>>>>> Stashed changes

    return(
        <div className="flex justify-center">
            <div className="w-1/2 grid justify-center">
                <h1 style={{fontSize: 45, color: '#121212'}}> Create your project</h1>
                <p style={{color: '#4C4C4C', fontSize:20}} className="mb-10">Write the title of the sections you want to add.</p>
<<<<<<< Updated upstream
                <SectionCreate />
                <div className='mt-10'></div>
                <CollaboratorsSelect />
                <Button className='mt-5'>Create</Button>
=======
                <div id="sections"></div>
                <ProfileForm onSubmit={handleFormSubmit} />
>>>>>>> Stashed changes
            </div>
        </div>
    )
}
