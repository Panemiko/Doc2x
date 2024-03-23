import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { DeleteProject } from "./delete";
import { Section } from "./section";
import { UpdateProject } from "./update";

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await api.project.byId({
    projectId: params.projectId,
  });

  const sections = await api.section.byProject({
    projectId: params.projectId,
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-10">
        <span className="text-3xl">Project settings</span>
      </div>
      <div>
        <UpdateProject project={project} />
      </div>

      <div className="mb-10">
        <span className="mb-10 block text-2xl">Sections</span>
        <div className="flex flex-col gap-1">
          {sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <span className="text-2xl">Danger zone</span>
        <DeleteProject project={project} />
      </div>
    </div>
  );
}
