"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ProjetcsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";

  const handleFilterByCategory = (categoryName: string) => {
    const params = new URLSearchParams(window.location.search);

    if (categoryName === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryName);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm dark:text-slate-300">Filter by:</p>
      <Select onValueChange={handleFilterByCategory} value={currentCategory}>
        <SelectTrigger className="dark:bg-darkBlue dark:hover:bg-darkBlue/90 cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-700 dark:text-white dark:focus-visible:ring-white">
          <SelectValue placeholder="Filter By Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Web Developer">Web Developer</SelectItem>
          <SelectItem value="Graphic Design">Graphic Design</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProjetcsFilter;
