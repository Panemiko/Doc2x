import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Content } from "./content";

export default async function Page({
  params,
}: {
  params: { projectId: string; sectionId: string };
}) {
  const project = await api.project.byId({
    projectId: params.projectId,
  });

  const section = await api.section.byId({
    sectionId: params.sectionId,
  });

  if (!project || !section) {
    notFound();
  }

  return (
    <div className="w-full max-w-2xl">
      <div>
        <span className="text-2xl">{section.title}</span>
      </div>
      <Content section={section} />
    </div>
  );
}
