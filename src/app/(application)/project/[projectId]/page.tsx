import { MaxWidth } from "@/components/max-width";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <MaxWidth className="my-20">
      <div className="flex max-w-sm flex-col gap-7">
        <div>
          <h1 className="text-2xl font-medium">Project name</h1>
          <span className="text-foreground/70">Created at 20/20/2000</span>
        </div>
        <Separator />
        <div>
          <span className="mb-2 block font-medium">
            Collaborators <span className="text-foreground/70">(3)</span>
          </span>
          <div className="flex list-disc flex-col gap-1">
            <span className="text-sm text-foreground/70">Pedro Marquile</span>
            <span className="text-sm text-foreground/70">Rodrigo Dini</span>
            <span className="text-sm text-foreground/70">Vitor Kniphoff</span>
          </div>
        </div>
        <Separator />
        <div>
          <span className="mb-2 block font-medium">
            Sections <span className="text-foreground/70">(3)</span>
          </span>
          <div className="flex list-disc flex-col gap-1">
            <span className="text-sm text-foreground/70">Introduction</span>
            <span className="text-sm text-foreground/70">Objectives</span>
            <span className="text-sm text-foreground/70">
              Theoretical Reference
            </span>
          </div>
        </div>
      </div>
    </MaxWidth>
  );
}
