"use client";

import { downvoteAnswer, upvoteAnswer } from "@/actions/answer";
import { downvoteQuestion, upvoteQuestion } from "@/actions/question";
import { toggleSaveQuestion } from "@/actions/user";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: userId,
      questionId: itemId,
      hasSaved,
      path: pathname,
    });
  };

  const handleVote = async (action: string) => {
    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: itemId,
          userId: userId,
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: itemId,
          userId: userId,
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
    }
    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: itemId,
          userId: userId,
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: itemId,
          userId: userId,
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex items-center justify-center gap-2.5">
        <div className="flex items-center justify-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex items-center justify-center min-w-[18px] rounded-sm p-1">
            <p className="font-medium">{formatAndDivideNumber(upvotes)}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex items-center justify-center min-w-[18px] rounded-sm p-1">
            <p className="font-medium">{formatAndDivideNumber(downvotes)}</p>
          </div>
        </div>
      </div>
      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
