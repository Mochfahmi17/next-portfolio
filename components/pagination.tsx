import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import clsx from "clsx";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const getPaginationNumbers = (
    currentPage: number,
    totalPages: number,
  ): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage < 3) {
      return [1, 2, 3, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {getPaginationNumbers(currentPage, totalPages).map((pageItem, i) => {
        if (pageItem === "...") {
          return (
            <Button
              variant="ghost"
              size="icon"
              key={`ellipsis-${i}`}
              disabled={pageItem === "..."}
            >
              ...
            </Button>
          );
        }
        return (
          <Button
            variant="outline"
            size="icon"
            key={`page-${pageItem}`}
            onClick={() => handlePageChange(Number(pageItem))}
            className={clsx("cursor-pointer", {
              "bg-darkBlue hover:bg-darkBlue/80 text-white hover:text-white":
                pageItem === currentPage,
            })}
          >
            {pageItem}
          </Button>
        );
      })}
    </div>
  );
};

export default Pagination;
