import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type SkillCardSkeletonProps = {
  column: number;
};

const SkillCardSkeleton = ({ column }: SkillCardSkeletonProps) => {
  return (
    <>
      {Array(column)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="dark:bg-midnightBlue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2.5">
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                <div className="w-24 animate-pulse rounded-full bg-gray-200 py-2"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-20 animate-pulse rounded-full bg-gray-200 py-2"></div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-50">
                <div className="flex h-full w-4/5 animate-pulse items-center justify-end rounded-full bg-gray-200 px-1"></div>
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default SkillCardSkeleton;
