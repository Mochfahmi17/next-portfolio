import EditSkill from "@/components/dashboard/skills/edit-skill";
import { notFound } from "next/navigation";
import { use } from "react";

type EditSkillPageProps = {
  params: Promise<{ id: string }>;
};

export default function EditSkillPage({ params }: EditSkillPageProps) {
  const id = use(params).id;

  if (!id) return notFound();

  return (
    <section className="px-4 py-6">
      <EditSkill id={id} />
    </section>
  );
}
