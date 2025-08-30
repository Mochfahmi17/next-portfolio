"use client";

import { Form } from "@/components/ui/form";
import TitleInput from "./field/title-input";
import ImageFileInput from "./field/image-file-input";
import DescriptionInput from "./field/description-input";
import CategorySelect from "./field/category-select";
import SkillMultiSelect from "./field/skill-multi-select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { editProjectSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { apiBaseUrl } from "@/lib/api";
import { toast } from "sonner";
import { ProjectDetail } from "@/types";
import LinkDemoInput from "./field/link-demo-input";
import LinkRepositoryInput from "./field/link-repository-input";

type EditProjectFormProps = {
  initialData: ProjectDetail;
};

const EditProjectForm = ({ initialData }: EditProjectFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof editProjectSchema>>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description,
      categoryProjectId: initialData.categoryProjectId,
      skillId: initialData.skills.map((skill) => skill.id),
      image: undefined,
      linkDemo: initialData.linkDemo ?? "",
      linkRepository: initialData.linkRepository ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof editProjectSchema>) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("categoryProjectId", values.categoryProjectId);
        values.skillId.forEach((skillId) => {
          formData.append("skillId", skillId);
        });
        if (values.image) {
          formData.append("image", values.image);
        }
        if (values.linkDemo) {
          formData.append("linkDemo", values.linkDemo);
        }
        if (values.linkRepository) {
          formData.append("linkRepository", values.linkRepository);
        }

        const res = await fetch(
          `${apiBaseUrl}/projects/edit/${initialData.slug}`,
          {
            method: "PUT",
            body: formData,
            credentials: "include",
          },
        );

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success(data.message);
        form.reset();
        router.push("/dashboard/projects");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <TitleInput form={form} name="title" pending={isPending} />
            <ImageFileInput
              form={form}
              name="image"
              pending={isPending}
              oldPreview={initialData.imageUrl}
            />
            <DescriptionInput
              form={form}
              name="description"
              pending={isPending}
            />
          </div>
          <div className="space-y-6">
            <CategorySelect
              form={form}
              name="categoryProjectId"
              pending={isPending}
            />
            <SkillMultiSelect form={form} name="skillId" pending={isPending} />
            <LinkDemoInput form={form} name="linkDemo" pending={isPending} />
            <LinkRepositoryInput
              form={form}
              name="linkRepository"
              pending={isPending}
            />
            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="w-full cursor-pointer"
            >
              {isPending ? "Loading..." : "Update Project"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditProjectForm;
