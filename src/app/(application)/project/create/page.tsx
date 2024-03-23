"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CollaboratorsSelect } from "./collaborators";
import { ProjectInfos } from "./form";
import { SectionCreate } from "./sections";

export default function Page() {
  const [formData, setFormData] = useState<{
    project: { title: string; abstract: string };
    collaborators: { value: string; id: string }[];
    sections: { value: string; id: string }[];
  }>({
    project: { title: "", abstract: "" },
    collaborators: [],
    sections: [],
  });

  function handleProjectInfos(data: { title: string; abstract: string }) {
    setFormData((prevData) => ({
      ...prevData,
      project: data,
    }));
  }

  function handleCollaboratorsData(data: { value: string; id: string }[]) {
    setFormData((prevData) => ({
      ...prevData,
      collaborators: data,
    }));
  }

  function handleSectionsData(data: { value: string; id: string }[]) {
    setFormData((prevData) => ({
      ...prevData,
      sections: data,
    }));
  }

  const { mutateAsync, isPending } = api.project.create.useMutation();
  const router = useRouter();

  async function handleCreateProject() {
    if (
      formData.project.title &&
      formData.collaborators.length > 0 &&
      formData.sections.length > 0
    ) {
      const project = await mutateAsync({
        title: formData.project.title,
        abstract: formData.project.abstract,
        collaboratorEmails: formData.collaborators.map((c) => c.value),
        sectionTitles: formData.sections.map((s) => s.value),
      });

      router.push(`/project/${project.id}`);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="grid w-1/2 justify-center">
        <h1 style={{ fontSize: 45, color: "#121212" }}>Create your project</h1>
        <ProjectInfos onProjectInfos={handleProjectInfos} />
        <SectionCreate onSectionCreate={handleSectionsData} />
        <div className="mt-10"></div>
        <CollaboratorsSelect onCollaboratorsData={handleCollaboratorsData} />
        <Button
          isLoading={isPending}
          className="mt-5"
          onClick={handleCreateProject}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
