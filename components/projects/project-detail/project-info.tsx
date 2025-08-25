"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skills } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ViewDesignImage from "./view-design-image";

type ProjectInfoProps = {
  category: string;
  title: string;
  dateCreate: Date;
  skills: Skills[];
  imageUrl: string;
  linkDemo?: string;
  linkRepository?: string;
};

const ProjectInfo = ({
  category,
  title,
  dateCreate,
  skills,
  imageUrl,
  linkDemo,
  linkRepository,
}: ProjectInfoProps) => {
  const [showDesignProject, setShowDesignProject] = useState<string | null>(
    null,
  );

  const formattedDate = (date: Date) => {
    return Intl.DateTimeFormat("en-EN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  return (
    <>
      <Card className="dark:bg-midnightBlue flex h-full flex-col">
        <CardHeader>
          <CardTitle>
            <div className="space-y-4">
              {/* Category Badge */}
              <span
                className={clsx(
                  "inline-block rounded-full px-4 py-1 text-xs font-medium",
                  {
                    "bg-indigo-100 text-indigo-700":
                      category === "Web Developer",
                    "bg-green-100 text-green-700":
                      category === "Graphic Design",
                  },
                )}
              >
                {category}
              </span>

              {/* Title & Date */}
              <h3 className="text-darkBlue text-2xl font-bold dark:text-white">
                {title}
              </h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-300">
                Created: <time>{formattedDate(new Date(dateCreate))}</time>
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        {/* Technologies / Software */}
        <CardContent className="flex-1 overflow-auto">
          <h4 className="text-darkBlue mb-3 text-sm font-semibold dark:text-white">
            {category === "Web Developer"
              ? "Technologies Used:"
              : "Software Used:"}
          </h4>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="dark:shadow-neon inline-flex cursor-pointer items-center gap-2 border-2 px-3 py-1 text-xs text-gray-700 shadow dark:border-white dark:text-white"
              >
                <Image
                  src={skill.iconUrl}
                  alt={skill.name}
                  width={16}
                  height={16}
                  className="rounded-sm"
                />
                {skill.name}
              </Badge>
            ))}
          </div>
        </CardContent>

        {/* CTA Buttons */}
        <CardFooter>
          {category === "Web Developer" ? (
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                asChild={!!linkDemo}
                className="bg-darkBlue hover:bg-darkBlue/80 dark:shadow-neon flex-1 cursor-pointer transition hover:scale-105 dark:border-2 dark:border-white dark:text-white"
              >
                {linkDemo ? (
                  <Link href={linkDemo}>View Demo</Link>
                ) : (
                  "View Demo"
                )}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                asChild={!!linkRepository}
                className="dark:text-darkBlue flex-1 cursor-pointer transition hover:scale-105 dark:bg-white"
              >
                {linkRepository ? (
                  <Link href={linkRepository}>View Repository</Link>
                ) : (
                  "View Repository"
                )}
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              onClick={() => setShowDesignProject(imageUrl)}
              className="bg-darkBlue hover:bg-darkBlue/80 dark:shadow-neon flex-1 cursor-pointer transition hover:scale-105 dark:border-2 dark:border-white dark:text-white"
            >
              Show Image
            </Button>
          )}
        </CardFooter>
      </Card>

      {showDesignProject && (
        <ViewDesignImage
          image={showDesignProject}
          alt={title}
          closePreview={setShowDesignProject}
        />
      )}
    </>
  );
};

export default ProjectInfo;
