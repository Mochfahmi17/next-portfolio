"use client";
import { Form } from "@/components/ui/form";
import { editSkillSchema } from "@/schemas";
import { Skills } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import NameSkillInput from "./field/name-skill-input";
import IconImageInput from "./field/icon-image-input";
import LevelSelect from "./field/level-select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransition } from "react";
import { apiBaseUrl } from "@/lib/api";
import { useRouter } from "next/navigation";

type EditSkillFormProps = {
  skillId: string;
  initialData: Skills;
};

const EditSkillForm = ({ skillId, initialData }: EditSkillFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof editSkillSchema>>({
    resolver: zodResolver(editSkillSchema),
    defaultValues: {
      name: initialData.name,
      levelId: initialData.levelId,
      icon: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof editSkillSchema>) => {
    startTransition(async () => {
      try {
        const formdata = new FormData();
        formdata.append("name", values.name);
        formdata.append("levelId", values.levelId);
        if (values.icon) {
          formdata.append("icon", values.icon);
        }

        const res = await fetch(`${apiBaseUrl}/skills/edit/${skillId}`, {
          method: "PUT",
          body: formdata,
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success(data.message);
        form.reset();
        router.push("/dashboard/skills");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-2xl space-y-6"
      >
        <div className="space-y-6">
          <NameSkillInput form={form} name="name" pending={isPending} />
          <IconImageInput
            form={form}
            name="icon"
            oldPreview={initialData.iconUrl}
            pending={isPending}
          />
          <LevelSelect form={form} name="levelId" pending={isPending} />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full cursor-pointer"
        >
          {isPending ? "Loading..." : "Update Skill"}
        </Button>
      </form>
    </Form>
  );
};

export default EditSkillForm;
