import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type paginationProps = {
  previousPage: string;
  nextPage: string;
  isLastPage: boolean;
};

const linkStyles =
  "flex items-center gap-x-2 bg-white/5 text-white px-5 py-3 rounded-md opacity-75 hover:opacity-100 transition text-sm";

export default function Pagination({
  previousPage,
  nextPage,
  isLastPage,
}: paginationProps) {
  return (
    <section
      className={cn("flex justify-between w-full", isLastPage && "mt-10")}
    >
      {!!previousPage ? (
        <Link className={linkStyles} href={previousPage}>
          <ArrowLeftIcon />
          Previous
        </Link>
      ) : (
        <div />
      )}

      {!!nextPage && (
        <Link className={linkStyles} href={nextPage}>
          <ArrowRightIcon />
          Next
        </Link>
      )}
    </section>
  );
}
