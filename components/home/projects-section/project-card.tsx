"use client";
import Popup from "@/components/popup/popup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { apiBaseUrl } from "@/lib/api";
import { Skills } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type ProjectCardProps = {
  title?: string;
  slug: string;
  image: string;
  description?: string;
  category: string;
  skills: Skills[];
  createdAt: Date;
  mutate: () => void;
  isRouteDashboard: boolean;
};

const ProjectCard = ({
  title,
  slug,
  image,
  description,
  category,
  skills,
  createdAt,
  mutate,
  isRouteDashboard,
}: ProjectCardProps) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const formattedDate = (date: Date) => {
    return Intl.DateTimeFormat("en-EN", {
      day: "2-digit",
      month: "long",
      year: "2-digit",
    }).format(date);
  };

  const handleDeleteProject = () => {
    startTransition(async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/projects/delete/${slug}`, {
          method: "DELETE",
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success(data.message);
        setShowConfirm(false);
        mutate();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      }
    });
  };
  return (
    <>
      <Card className="dark:bg-midnightBlue flex h-full flex-col overflow-hidden rounded-xl border-0 bg-white pt-0 shadow-md transition-shadow duration-200 hover:shadow-lg">
        <CardHeader className="group relative h-60 w-full overflow-hidden bg-slate-50 p-0">
          <Image
            src={image}
            alt={`${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
          {isRouteDashboard && (
            <div className="absolute inset-0 hidden items-center justify-center gap-4 transition-all group-hover:flex group-hover:bg-black/50">
              <Button variant="secondary" asChild className="cursor-pointer">
                <Link href={`projects/edit/${slug}`}>Edit</Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowConfirm(true)}
                className="cursor-pointer"
              >
                Delete
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-1 space-y-2.5">
          <div className="flex items-center justify-between">
            <span
              className={clsx(
                "inline-block rounded-full px-3 py-1 text-xs font-medium",
                {
                  "bg-indigo-100 text-indigo-700": category === "Web Developer",
                  "bg-green-100 text-green-700": category === "Graphic Design",
                },
              )}
            >
              {category}
            </span>
            <time className="text-xs text-gray-400 dark:text-slate-300">
              {formattedDate(new Date(createdAt))}
            </time>
          </div>

          <h2
            title={title}
            className="text-darkBlue text-lg font-semibold dark:text-white"
          >
            <Link
              href={`projects/${slug}`}
              className="transition-all hover:opacity-70"
            >
              {title}
            </Link>
          </h2>

          <p className="mb-4 line-clamp-3 text-sm text-pretty text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </CardContent>
        <CardFooter className="block">
          <h4 className="text-darkBlue mb-2 text-sm font-semibold dark:text-white">
            {category === "Web Developer"
              ? " technologies Used:"
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
                  width={14}
                  height={14}
                />
                {skill.name}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>

      {showConfirm && (
        <Popup
          title={`Are you sure want to delete ${title} project?`}
          closePopup={setShowConfirm}
        >
          <Button
            size="lg"
            variant="destructive"
            onClick={() => setShowConfirm(false)}
            disabled={isPending}
            className="mt-auto cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleDeleteProject}
            disabled={isPending}
            className="mt-auto cursor-pointer"
          >
            Delete
          </Button>
        </Popup>
      )}
    </>
  );
};

export default ProjectCard;
