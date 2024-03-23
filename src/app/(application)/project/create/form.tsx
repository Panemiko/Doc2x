import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { projectAbstractSchema, projectTitleSchema } from "@/schemas/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: projectTitleSchema,
  abstract: projectAbstractSchema,
});

export function ProjectInfos({
  onProjectInfos,
}: {
  onProjectInfos: (data: { title: string; abstract: string }) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      abstract: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onProjectInfos({ title: data.title, abstract: data.abstract });
  };

  const handleBlur = () => {
    void form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form className="space-y-8 p-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: Sea Research"
                  {...field}
                  onBlur={handleBlur}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="abstract"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Abstract</FormLabel>
              <FormControl>
                <Input
                  placeholder="Resume your project"
                  {...field}
                  onBlur={handleBlur}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
