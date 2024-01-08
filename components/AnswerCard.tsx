import { Question, User } from "@prisma/client";
import Link from "next/link";
import EditDeleteAction from "./EditDeleteAction";
import Metric from "./Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";

interface AnswerCardProps {
  id: string;
  clerkId: string;
  author: User;
  question: Question;
  upvotes: number;
  createdAt: Date;
}

export const AnswerCard = ({
  id,
  clerkId,
  author,
  question,
  upvotes,
  createdAt,
}: AnswerCardProps) => {
  const showActionButton = clerkId === author.clerkId;

  return (
    <Link
      className="dark:bg-[#0F1117] shadow-md dark:shadow-none flex flex-col gap-2 rounded-xl p-9 sm:px-11"
      href={`/question/${question.id}`}
    >
      <div className="flex justify-between items-center">
        <div className="font-semibold text-xl line-clamp-1">
          {question.title}
        </div>
        {showActionButton && <EditDeleteAction type="Answer" itemId={id} />}
      </div>
      <div className="flex items-center justify-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user avatar"
          value={author.name}
          title={`${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};
