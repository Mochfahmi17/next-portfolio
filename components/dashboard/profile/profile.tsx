"use client";
import ProfileHeader from "./profile-header";
import AboutCard from "./about-card";
import InfoCard from "./info-card";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import { apiBaseUrl } from "@/lib/api";
import { UserResponse } from "@/types";

const Profile = () => {
  const { data: response, isLoading } = useSWR<UserResponse>(
    `${apiBaseUrl}/user`,
    fetcher,
  );

  const user = response?.data ?? [];
  return (
    <>
      {user.map((usr) => (
        <div key={usr.id}>
          <ProfileHeader
            profile={usr.profileUrl ?? ""}
            email={usr.email}
            name={usr.name}
            profileId={usr.id}
            loading={isLoading}
          />

          <section className="mt-8 grid gap-6 px-4 py-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <AboutCard />
            </div>
            <div className="space-y-6">
              <InfoCard />
            </div>
          </section>
        </div>
      ))}
    </>
  );
};

export default Profile;
