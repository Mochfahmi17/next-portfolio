import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectDescriptionProps = {
  description: string;
};

const ProjectDescription = ({ description }: ProjectDescriptionProps) => {
  return (
    <Card className="dark:bg-midnightBlue shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Project Description:</CardTitle>
      </CardHeader>
      <CardContent className="min-h-60">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProjectDescription;
