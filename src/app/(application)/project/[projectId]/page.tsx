import { MaxWidth } from "@/components/max-width";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await api.project.byId({
    projectId: params.projectId,
  });

  const collaborations = await api.collaboration.byProject({
    projectId: params.projectId,
  });

  const sections = await api.section.byProject({
    projectId: params.projectId,
  });

  if (!project) {
    notFound();
  }

  return (
    <MaxWidth className="my-20">
      <div className="flex max-w-sm flex-col gap-7">
        <div>
          <h1 className="text-2xl font-medium">{project.title}</h1>
          <span className="text-foreground/70">
            Created at {project.createdAt.toLocaleDateString("pt-BR")}
          </span>
        </div>
        <Separator />
        <div>
          <span className="mb-2 block font-medium">
            Collaborators
            <span className="text-foreground/70">
              ({collaborations.length})
            </span>
          </span>
          <div className="flex list-disc flex-col gap-1">
            {collaborations.map((collaboration) => (
              <span
                key={collaboration.id}
                className="text-sm text-foreground/70"
              >
                {collaboration.user.name}
              </span>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <span className="mb-2 block font-medium">
            Sections
            <span className="text-foreground/70">({sections.length})</span>
          </span>
          <div className="flex list-disc flex-col gap-1">
            {sections.map((section) => (
              <span key={section.id} className="text-sm text-foreground/70">
                {section.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MaxWidth>
  );
}
