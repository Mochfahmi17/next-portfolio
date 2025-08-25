import EditSkillForm from "./edit-skill-form";
import { apiBaseUrl } from "@/lib/api";
import { Skills } from "@/types";
import { notFound } from "next/navigation";
import { use } from "react";

type EditSkillProps = {
  id: string;
};

const fetchingDetailSkill = async (id: string) => {
  const res = await fetch(`${apiBaseUrl}/skills/${id}`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    return notFound();
  }

  const skill: Skills = data.data;

  return skill;
};

const EditSkill = ({ id }: EditSkillProps) => {
  const skill = use(fetchingDetailSkill(id));
  return (
    <div>
      <h2 className="mb-8 text-center text-2xl font-semibold">Edit Skill</h2>
      <EditSkillForm skillId={id} initialData={skill} />
    </div>
  );
};

export default EditSkill;
