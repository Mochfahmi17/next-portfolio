import SkillsGrid from "@/components/home/skills-section/skills-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const skills = () => {
  return (
    <div>
      <h2 className="mb-8 text-center text-2xl font-semibold dark:text-white">
        My Skills
      </h2>
      <div className="flex justify-end">
        <Button
          variant="outline"
          asChild
          className="dark:shadow-neon cursor-pointer font-semibold dark:border-2 dark:border-white dark:text-white"
        >
          <Link href="skills/add">Add New Skill</Link>
        </Button>
      </div>
      <SkillsGrid />
    </div>
  );
};

export default skills;
