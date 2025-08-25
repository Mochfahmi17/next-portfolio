import { apiBaseUrl } from "@/lib/api";
import { User, UserDetailResponse } from "@/types";
import { notFound } from "next/navigation";
import { use } from "react";
import EditProfileForm from "./edit-profile-form";

type EditProfileProps = {
  id: string;
};

const fetchingDetailUser = async (id: string) => {
  const res = await fetch(`${apiBaseUrl}/user/${id}`, {
    method: "GET",
  });

  const data: UserDetailResponse = await res.json();

  if (!res.ok) {
    return notFound();
  }

  const user: User = data.data;

  return user;
};

const EditProfile = ({ id }: EditProfileProps) => {
  const user = use(fetchingDetailUser(id));
  return (
    <div>
      <h2 className="mb-8 text-center text-2xl font-semibold">Edit Profile</h2>
      <EditProfileForm initialData={user} />
    </div>
  );
};

export default EditProfile;
