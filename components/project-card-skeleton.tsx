"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type ProjectCardSkeletonProps = {
  column: number;
};

const ProjectCardSkeleton = ({ column }: ProjectCardSkeletonProps) => {
  return (
    <>
      {Array(column)
        .fill(0)
        .map((_, i) => (
          <Card
            key={i}
            className="dark:bg-midnightBlue overflow-hidden pt-0 shadow-md"
          >
            <CardHeader className="px-0">
              <div className="relative h-60 animate-pulse bg-gray-200"></div>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-28 animate-pulse rounded-full bg-gray-200 py-3"></span>
                <span className="w-16 animate-pulse rounded-full bg-gray-200 py-3"></span>
              </div>
              <div className="min-h-6 w-1/2 animate-pulse rounded-full bg-gray-200"></div>
              <div className="mb-4 min-h-16 w-full animate-pulse rounded-md bg-gray-200"></div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 animate-pulse rounded-full bg-gray-200 py-3"
                  ></span>
                ))}
            </CardFooter>
          </Card>
        ))}
    </>
  );
};

export default ProjectCardSkeleton;
