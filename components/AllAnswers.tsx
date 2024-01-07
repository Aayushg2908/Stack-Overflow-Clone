import Image from "next/image";
import ParseHTML from "./ParseHTML";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";
import { Answer, User } from "@prisma/client";
import Votes from "./Votes";

interface Props {
  userId: string;
  totalAnswers: number;
  answers: (Answer & { author: User; upvotes: User[]; downvotes: User[] })[];
}

const AllAnswers = ({ userId, totalAnswers, answers }: Props) => {
  return (
    <div className="mt-4">
      <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 font-bold text-lg">
        {totalAnswers} Answers
      </h3>
      <div>
        {answers.map((answer) => (
          <article key={answer.id} className="border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  width={18}
                  height={18}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="font-semibold">{answer.author.name}</p>

                  <p className="font-normal text-muted-foreground ml-0.5 mt-0.5 line-clamp-1">
                    answered {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end">
                <Votes
                  type="Answer"
                  itemId={answer.id}
                  userId={userId}
                  upvotes={answer.upvotes.length}
                  hasupVoted={!!answer.upvotes.find((u) => u.id === userId)}
                  downvotes={answer.downvotes.length}
                  hasdownVoted={!!answer.downvotes.find((u) => u.id === userId)}
                  hasSaved={false}
                />
              </div>
            </div>

            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
