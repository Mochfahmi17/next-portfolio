import EditProfile from "@/components/dashboard/profile/edit-profile";
import { notFound } from "next/navigation";
import { use } from "react";

type EditProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default function EditProfilePage({ params }: EditProfilePageProps) {
  const id = use(params).id;

  if (!id) return notFound();
  return (
    <section className="px-4 py-6">
      <EditProfile id={id} />
    </section>
  );
}
