import EditCertificate from "@/components/dashboard/certificate/edit-certificate";
import { notFound } from "next/navigation";
import { use } from "react";

type EditCertificatePageProps = {
  params: Promise<{ id: string }>;
};

export default function EditCertificatePage({
  params,
}: EditCertificatePageProps) {
  const id = use(params).id;

  if (!id) return notFound();

  return (
    <section className="px-4 py-6">
      <EditCertificate id={id} />
    </section>
  );
}
