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
import { userEmailSchema } from "@/schemas/user";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TRPCClientError } from "@trpc/client";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: userEmailSchema,
});

export function AddCollaborator({ projectId }: { projectId: string }) {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync, isPending } = api.collaboration.create.useMutation();
  const router = useRouter();

  async function addCollaborator(data: z.infer<typeof formSchema>) {
    try {
      void mutateAsync({
        projectId,
        userEmail: data.email,
      });

      router.refresh();
    } catch (error) {
      const trpcError = error as TRPCClientError<AppRouter>;

      if (trpcError.data?.code === "FORBIDDEN") {
        form.setError("email", {
          message: "User not found",
        });
      }

      if (trpcError.shape?.data?.code === "CONFLICT") {
        form.setError("email", {
          message: "User is already a collaborator",
        });
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Collaborator</DialogTitle>
          <DialogDescription>
            Insert the email of the collaborator you want to add to this
            project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addCollaborator)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="name@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    The e-mail of your collaborator.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" size="sm" isLoading={isPending}>
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
