import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { forwardRef } from "react";
import { buttonVariants } from "./button";

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Link
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

ButtonLink.displayName = "Button";

export { ButtonLink };
