"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";
import { type Section } from "@prisma/client";
import MdEditor from "@uiw/react-md-editor";
import { SaveIcon } from "lucide-react";
import { useState } from "react";

export function Content({ section }: { section: Section }) {
  const [content, setContent] = useState(section.content);
  const [preview, setPreview] = useState(true);

  const { mutateAsync, isPending } = api.section.update.useMutation();

  async function saveContent() {
    try {
      await mutateAsync({
        sectionId: section.id,
        content,
        title: section.title,
      });
    } catch {}
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-end gap-6">
        <Button isLoading={isPending} variant="outline" size="sm" onClick={saveContent}>
          <SaveIcon /> Save
        </Button>
        <Label className="flex items-center gap-2">
          <Switch checked={preview} onCheckedChange={setPreview} />
          Preview
        </Label>
      </div>
      <MdEditor
        value={content}
        className="min-h-screen"
        style={{ zoom: "1.2", outline: "none" }}
        data-color-mode="light"
        preview={preview ? "preview" : "edit"}
        onChange={(value) => setContent(value ?? "")}
      />
    </div>
  );
}
