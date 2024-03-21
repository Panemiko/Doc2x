import { GoogleIcon } from "@/components/icons/google";
import { ButtonLink } from "@/components/ui/button-link";
import { type Metadata } from "next";

export const metatada: Metadata = {
  title: "Sign in",
};

export default async function Page() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen items-center bg-gradient-to-l from-background to-primary/50 px-20">
      <div className="flex h-screen w-full border border-border max-w-lg flex-col justify-between bg-background px-10 py-20">
        <div>
          <h1 className="text-3xl font-medium text-primary">doc2x</h1>
        </div>
        <div>
          <h1 className="mb-10 text-3xl font-medium text-foreground">
            Sign in
          </h1>
          <p className="mb-10 text-foreground/70">
            <span className="block">Welcome to doc2x! </span>Sign in with your
            Google account to get started.
          </p>
          <div className="flex justify-center">
            <ButtonLink
              size="lg"
              href="/api/auth/google"
              className="w-full bg-[#1b66c9] text-white hover:bg-[#1b66c9]/90"
            >
              <GoogleIcon className="mr-3 h-5 w-5 fill-white" />
              SIGN IN WITH GOOGLE
            </ButtonLink>
          </div>
        </div>
        <div>
          <span className="text-foreground/70">doc2x &copy; {currentYear}</span>
        </div>
      </div>
    </div>
  );
}
