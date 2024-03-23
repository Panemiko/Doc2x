import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

export function MaxWidth({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto max-w-screen-2xl px-6", className)}
      {...props}
    />
  );
}
