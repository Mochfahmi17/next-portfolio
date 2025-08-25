"use client";
import { Form } from "@/components/ui/form";
import { certificateSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import CertificateTitleInput from "./field/certificate-title-input";
import CertificateImageInput from "./field/certificate-image-input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { apiBaseUrl } from "@/lib/api";
import { CertificateResponse } from "@/types";
import { toast } from "sonner";

const AddCertificateForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof certificateSchema>>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      title: "",
      certificateImage: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof certificateSchema>) => {
    startTransition(async () => {
      try {
        const formdata = new FormData();
        formdata.append("title", values.title);
        formdata.append("certificateImage", values.certificateImage);
        const res = await fetch(`${apiBaseUrl}/certificates/create`, {
          method: "POST",
          body: formdata,
          credentials: "include",
        });

        const data: CertificateResponse = await res.json();

        if (!res.ok) {
          toast.error(data.message);
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
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full cursor-pointer"
        >
          {isPending ? "Loading..." : "Add Certificate"}
        </Button>
      </form>
    </Form>
  );
};

export default AddCertificateForm;
