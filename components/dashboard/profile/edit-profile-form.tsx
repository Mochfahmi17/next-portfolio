"use client";
import { Form } from "@/components/ui/form";
import { editUserSchema } from "@/schemas";
import { User, UserDetailResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import NameInput from "./field/name-input";
import ProfileImageInput from "./field/profile-image-input";
import ResumeInput from "./field/resume-input";
import { useTransition } from "react";
import { toast } from "sonner";
import { apiBaseUrl } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type EditProfileFormProps = {
  initialData: User;
};

const EditProfileForm = ({ initialData }: EditProfileFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: initialData.name,
      cv: undefined,
      profile: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof editUserSchema>) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        if (values.cv) {
          formData.append("cv", values.cv);
        }

        if (values.profile) {
          formData.append("profile", values.profile);
        }
        const res = await fetch(`${apiBaseUrl}/user/edit`, {
          method: "PUT",
          body: formData,
          credentials: "include",
        });

        const data: UserDetailResponse = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success(data.message);
        form.reset();
        router.push("/dashboard/profile");
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
          <NameInput form={form} name="name" pending={isPending} />
          <ProfileImageInput
            form={form}
            name="profile"
            pending={isPending}
            oldPreview={initialData.profileUrl}
          />
          <ResumeInput
            form={form}
            name="cv"
            pending={isPending}
            oldPreview={initialData.myCVUrl}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full cursor-pointer"
        >
          {isPending ? "Loading..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
