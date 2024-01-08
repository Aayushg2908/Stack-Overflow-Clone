import { getPopularTags } from "@/actions/answer";
import { getTopQuestions } from "@/actions/question";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export const RightSidebar = async () => {
  const topQuestions = await getTopQuestions();
  const popularTags = await getPopularTags();

  return (
    <div className="dark:bg-[#0F1117] custom-scrollbar sticky top-0 right-0 flex flex-col overflow-y-auto border-1 pt-36 p-6 shadow-md dark:shadow-none w-[300px] max-xl:hidden">
      <div>
        <div className="font-bold text-2xl">Top Questions</div>
        <div className="mt-4 flex w-full flex-col gap-y-8">
          {topQuestions.map((question) => (
            <Link
              href={`/question/${question.id}`}
              key={question.id}
              className="flex cursor-pointer items-start justify-between gap-7"
            >
              <p className="font-medium text-base text-muted-foreground">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron-right"
                width={20}
                height={20}
                className="invert dark:invert-0"
              />
            </Link>
          ))}
        </div>
      </div>
      <div>
        <div className="mt-6 font-bold text-2xl">Popular Tags</div>
        <div className="mt-6 grid grid-cols-2 gap-4 justify-center">
          {popularTags.map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.id}`}>
              <Badge className="bg-gradient-to-r from-orange-600 to-orange-400 font-medium w-fit flex items-center justify-center gap-2 rounded-sm border-none px-4 py-2 capitalize">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
