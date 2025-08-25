import EditProject from "@/components/dashboard/projects/edit-project";
import { notFound } from "next/navigation";
import { use } from "react";

type EditProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const slug = use(params).slug;

  if (!slug) return notFound();
  return (
    <section className="px-4 py-6">
      <EditProject slug={slug} />
    </section>
  );
}
