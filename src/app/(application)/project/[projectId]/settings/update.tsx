"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { projectAbstractSchema, projectTitleSchema } from "@/schemas/project";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: projectTitleSchema,
  abstract: projectAbstractSchema,
});

export function UpdateProject({ project }: { project: Project }) {
  const form = useForm({
    defaultValues: {
      title: project.title,
      abstract: project.abstract ?? "",
    },
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync, isPending } = api.project.update.useMutation();
  const router = useRouter();

  async function updateProject(data: z.infer<typeof formSchema>) {
    try {
      void mutateAsync({
        projectId: project.id,
        title: data.title,
        abstract: data.abstract,
      });

      router.refresh();
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateProject)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder={project.title} {...field} />
              </FormControl>
              <FormDescription>
                The academical name for the project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="abstract"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abstract</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={project.abstract ?? ""}
                ></Textarea>
              </FormControl>
              <FormDescription>A brief resume of the project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-10">
          <Button type="submit" isLoading={isPending}>
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
