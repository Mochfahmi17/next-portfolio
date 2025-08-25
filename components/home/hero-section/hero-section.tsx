import HeroHeading from "./hero-heading";
import HeroSubheading from "./hero-subheading";
import HeroSocialLinks from "./hero-social-links";
import HeroCTAButton from "./hero-cta-button";
import HeroProfileImage from "./hero-profile-image";
import { apiBaseUrl } from "@/lib/api";
import { UserResponse } from "@/types";
import { use } from "react";

const fethcingUser = async () => {
  const res = await fetch(`${apiBaseUrl}/user`);

  const data: UserResponse = await res.json();

  if (!res.ok) {
    throw new Error(`Failed feching data, status: ${res.status}`);
  }

  const user = data.data;

  return user;
};

const HeroSection = () => {
  const user = use(fethcingUser());
  return (
    <section id="home" className="py-28 md:pt-40">
      <div className="container mx-auto px-[3%]">
        {user.map((myProfile) => (
          <div
            key={myProfile.id}
            className="grid items-center justify-center gap-36 lg:grid-cols-12 lg:gap-0"
          >
            <div className="space-y-6 lg:col-span-6">
              {/* Heading */}
              <HeroHeading name={myProfile.name} />

              {/* Sub-headline */}
              <HeroSubheading />

              {/* Social */}
              <HeroSocialLinks />

              {/* CTA project and cv */}
              <HeroCTAButton myCV={myProfile.myCVUrl ?? ""} />
            </div>
            <div className="place-self-center lg:col-span-6">
              {/* profile */}
              <HeroProfileImage profileImage={myProfile.profileUrl} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
