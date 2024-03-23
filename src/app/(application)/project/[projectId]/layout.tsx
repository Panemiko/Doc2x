import { MaxWidth } from "@/components/max-width";
import { ButtonLink } from "@/components/ui/button-link";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import { Settings2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type ReactNode } from "react";
import { AddCollaborator } from "./add-collaborator";
import { AddSection } from "./add-section";

export default async function Layout({
  params,
  children,
}: {
  params: { projectId: string };
  children: ReactNode;
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
    <MaxWidth className="my-20 flex gap-10">
      <div className="flex max-w-sm w-full flex-col gap-7">
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-medium">{project.title}</h1>
            <span className="text-foreground/70">
              Created at {project.createdAt.toLocaleDateString("pt-BR")}
            </span>
          </div>

          <div>
            <ButtonLink
              variant="secondary"
              className="w-full"
              href={`/project/${project.id}/settings`}
            >
              <Settings2 /> Settings
            </ButtonLink>
          </div>
        </div>
        <Separator />
        <div>
          <div className="flex items-center justify-between">
            <span className="mb-2 block font-medium">
              Collaborators{" "}
              <span className="text-foreground/70">
                ({collaborations.length})
              </span>
            </span>
            <div>
              <AddCollaborator projectId={project.id} />
            </div>
          </div>
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
          <div className="flex items-center justify-between">
            <span className="mb-2 block font-medium">
              Sections{" "}
              <span className="text-foreground/70">({sections.length})</span>
            </span>
            <div>
              <AddSection projectId={project.id} />
            </div>
          </div>
          <div className="flex list-disc flex-col gap-1">
            {sections.map((section) => (
              <Link
                href={`/project/${project.id}/section/${section.id}`}
                key={section.id}
                className="text-sm text-foreground/70"
              >
                {section.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="min-h-screen pr-20">
        <Separator orientation="vertical" />
      </div>
      {children}
    </MaxWidth>
  );
}
