"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { sectionTitleSchema } from "@/schemas/section";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Section } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: sectionTitleSchema,
});

export function Section({ section }: { section: Section }) {
  const [open, setOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      title: section.title,
    },
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: updateAsync, isPending } =
    api.section.update.useMutation();

  const { mutateAsync: deleteAsync } = api.section.delete.useMutation();

  const router = useRouter();

  async function updateSection(data: z.infer<typeof formSchema>) {
    try {
      void updateAsync({
        sectionId: section.id,
        title: data.title,
        content: section.content,
      });

      router.refresh();
      setOpen(false)
    } catch (error) {}
  }

  async function deleteSection() {
    try {
      void deleteAsync({
        sectionId: section.id,
      });

      router.refresh();
      setOpen(false)
    } catch (err) {}
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full justify-start  rounded-sm">
          {section.title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Section</DialogTitle>
          <DialogDescription>
            Update the title of the section &quot;{section.title}&quot;
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(updateSection)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduction" {...field} />
                  </FormControl>
                  <FormDescription>
                    A brief name for your section
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                onClick={deleteSection}
                type="button"
                variant="destructive"
                size="sm"
                isLoading={isPending}
              >
                Delete
              </Button>
              <Button type="submit" size="sm" isLoading={isPending}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
