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
import { sectionTitleSchema } from "@/schemas/section";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpFromLine, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  value: sectionTitleSchema,
});

export function SectionCreate({
  onSectionCreate,
}: {
  onSectionCreate: (data: { value: string; id: string }[]) => void;
}) {
  const [titles, setTitles] = useState<{ value: string; id: string }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  function randomNumber() {
    return Math.floor(Math.random() * 40);
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    const newTitle = {
      value: data.value,
      id: randomNumber().toString(),
    };
    setTitles((titles) => [...titles, newTitle]);
    form.reset();
    onSectionCreate([...titles, newTitle]);
  }

  function deleteTitle(id: string) {
    setTitles((titles) => titles.filter((title) => title.id !== id));
  }

  return (
    <Form {...form}>
      <div id="titles">
        {titles.map((title, index) => {
          return (
            <Button size="sm" variant="ghost" key={index}>
              {title.value}
              <X onClick={() => deleteTitle(title.id)} />
            </Button>
          );
        })}
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
                  <Input placeholder="Ex.: Introduction" {...field} />
                </FormControl>
                <Button className="ml-2">
                  <ArrowUpFromLine />
                </Button>
              </div>
              <FormDescription>Press enter to add.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
