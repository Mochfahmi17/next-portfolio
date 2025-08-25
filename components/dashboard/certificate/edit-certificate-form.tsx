"use client";
import { Form } from "@/components/ui/form";
import { Cerificates, CertificateDetailResponse } from "@/types";
import CertificateTitleInput from "./field/certificate-title-input";
import CertificateImageInput from "./field/certificate-image-input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { editCertificateSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { apiBaseUrl } from "@/lib/api";

type EditCertificateFormProps = {
  certificateId: string;
  initialData: Cerificates;
};

const EditCertificateForm = ({
  certificateId,
  initialData,
}: EditCertificateFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof editCertificateSchema>>({
    resolver: zodResolver(editCertificateSchema),
    defaultValues: {
      title: initialData.title,
      certificateImage: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof editCertificateSchema>) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        if (values.certificateImage) {
          formData.append("certificateImage", values.certificateImage);
        }

        const res = await fetch(
          `${apiBaseUrl}/certificates/edit/${certificateId}`,
          {
            method: "PUT",
            body: formData,
            credentials: "include",
          },
        );

        const data: CertificateDetailResponse = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success(data.message);
        form.reset();
        router.push("/dashboard/certificate");
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
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
          <CertificateTitleInput form={form} name="title" pending={isPending} />
          <CertificateImageInput
            form={form}
            name="certificateImage"
            pending={isPending}
            oldPreview={initialData.certificateUrl}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full cursor-pointer"
        >
          {isPending ? "Loading..." : "Update Certificate"}
        </Button>
      </form>
    </Form>
  );
};

export default EditCertificateForm;
