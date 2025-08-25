import { Button } from "@/components/ui/button";
import Link from "next/link";

const SeeMoreButton = () => {
  return (
    <div className="mt-14 flex justify-center">
      <Button
        asChild
        className="bg-darkBlue hover:bg-darkBlue/90 dark:text-darkBlue cursor-pointer text-white dark:bg-white"
      >
        <Link href="projects">See More</Link>
      </Button>
    </div>
  );
};

export default SeeMoreButton;
