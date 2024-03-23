"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { type Project } from "@prisma/client";
import { useRouter } from "next/navigation";

export function DeleteProject({ project }: { project: Project }) {
  const { mutateAsync, isPending } = api.project.delete.useMutation();
  const router = useRouter();

  async function deleteProject() {
    try {
      void mutateAsync({
        projectId: project.id,
      });

      router.push('/')
    } catch (error) {}
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit" variant="destructive">DELETE PROJECT</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the project &quot;{project.title}
            &quot;?
          </DialogDescription>
        </DialogHeader>
        <Button onClick={deleteProject} variant="destructive" isLoading={isPending}>
          DELETE PROJECT
        </Button>
      </DialogContent>
    </Dialog>
  );
}
