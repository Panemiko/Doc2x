import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title cannot be blank.",
    }),
    abstract: z.string().min(0),
});

export function ProjectInfos({ onProjectInfos }: { onProjectInfos: (data: { title: string, abstract: string }) => void })  {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            abstract: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        onProjectInfos({ title: data.title, abstract: data.abstract });
        form.reset(); // Reseta o formulário após o envio
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex.: Sea Research" {...field} />
                            </FormControl>
                            {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
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
                                <Input placeholder="Resume your project" {...field} />
                            </FormControl>
                            {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
