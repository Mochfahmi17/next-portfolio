"use client";
import { Form } from "@/components/ui/form";
import { skillSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import NameSkillInput from "./field/name-skill-input";
import LevelSelect from "./field/level-select";
import IconImageInput from "./field/icon-image-input";
import { apiBaseUrl } from "@/lib/api";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const AddSkillForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      levelId: "",
      icon: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof skillSchema>) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("levelId", values.levelId);
        formData.append("icon", values.icon);
        const res = await fetch(`${apiBaseUrl}/skills/create`, {
          method: "POST",
          body: formData,
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
          <IconImageInput form={form} name="icon" pending={isPending} />
          <LevelSelect form={form} name="levelId" pending={isPending} />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full cursor-pointer"
        >
          {isPending ? "Loading..." : "Add New Skill"}
        </Button>
      </form>
    </Form>
  );
};

export default AddSkillForm;
