"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { X } from 'lucide-react';
import { useState } from "react"
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
  value: z.string().min(1, {
    message: "Title cant e blank.",
  }),
})


export function CollaboratorsSelect({ onCollaboratorsData }: { onCollaboratorsData: (data: { value: string, id: string }[]) => void }){
    const [titles, setTitles] = useState<{ value: string, id: string }[]>([]);
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        value: '',
      },
    });
  function randomNumber() {
    return Math.floor(Math.random() * 40)
  }
  function onSubmit(data: z.infer<typeof formSchema>) {
    const newTitle = {
      value: data.value,
      id: randomNumber().toString()
    };
    setTitles(titles => [...titles, newTitle]);
    form.reset()
    onCollaboratorsData([...titles, newTitle]);
  }

  function deleteTitle(id: string) {
    setTitles(titles => titles.filter(title => title.id !== id));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} style={{ borderRadius: '15px', border: '3px solid #16A34A'}} className="space-y-8 p-2">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add your collaborators:</FormLabel>
              <div className="flex">
                <FormControl>
                  <Input placeholder="example@exmpl.com" {...field} />
                </FormControl>
                <Button className="ml-2"><Plus /></Button>
              </div>
              <FormDescription>
                Enter their email here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div id="titles">
        {
          titles.map((title, index) => {
            return <div className="flex mb-1"  key={index}>{title.value} 
            <X  onClick={() => deleteTitle(title.id)} /> 
            </div>
          })
        }
      </div>
      </form>
    </Form>
  )
}