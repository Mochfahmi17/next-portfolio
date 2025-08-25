import LoaderCircle from "@/components/loader-circle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProfileHeaderprops = {
  profile?: string;
  name: string;
  email: string;
  profileId: string;
  loading: boolean;
};

const ProfileHeader = ({
  profile,
  name,
  email,
  profileId,
  loading,
}: ProfileHeaderprops) => {
  return (
    <section className="flex h-60 w-full items-center bg-blue-50 px-[3%] md:px-[10%]">
      <div className="flex items-center gap-4 md:gap-8">
        <div className="relative aspect-square w-40 overflow-hidden rounded-full border-4 border-white bg-slate-50">
          {loading ? (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
              <div className="h-14 w-14">
                <LoaderCircle />
              </div>
            </div>
          ) : (
            <Image
              src={`${profile ? profile : "/profile.jpg"}`}
              alt="Profile"
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex">
          <div className="space-y-8">
            <div>
              <h1 className="text-lg font-bold md:text-2xl">{name}</h1>
              <p className="text-xs text-slate-600 md:text-sm">{email}</p>
            </div>
            <Button asChild className="cursor-pointer">
              <Link href={`profile/edit/${profileId}`}>Edit Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
