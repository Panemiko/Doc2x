"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { ArrowUpFromLine } from 'lucide-react'
import { X } from 'lucide-react';
import {  useState } from "react"
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

export function SectionCreate() {
  const [titles, setTitles] = useState<{ value: string, id: string }[]>([]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  })
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
  }


  // Função para excluir um título pelo ID
  function deleteTitle(id: string) {
    setTitles(titles => titles.filter(title => title.id !== id));
  }

  return (
    <Form {...form}>
      <div id="titles">
        {
          titles.map((title, index) => {
            return <Button size='sm' variant='ghost' key={index}>{title.value} 
            <X onClick={() => deleteTitle(title.id)} /> 
            </Button>
          })
        }
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title of your sections</FormLabel>
              <div className="flex">
                <FormControl>
                  <Input placeholder="Ex.:Introduction" {...field} />
                </FormControl>
                <Button className="ml-2"><ArrowUpFromLine /></Button>
              </div>
              <FormDescription>
                Press enter to add.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
