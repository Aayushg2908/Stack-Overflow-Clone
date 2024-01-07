import { getQuestionById } from "@/actions/question";
import { getUserById } from "@/actions/user";
import AllAnswers from "@/components/AllAnswers";
import Answer from "@/components/Answer";
import Metric from "@/components/Metric";
import ParseHTML from "@/components/ParseHTML";
import Votes from "@/components/Votes";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const QuestionByIdPage = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const question = await getQuestionById(params.id);
  const user = await getUserById(userId);

  if (!question || !user) {
    return null;
  }

  const hasupVoted = !!question.upvotes.find((u) => u.id === user.id);
  const hasdownVoted = !!question.downvotes.find((u) => u.id === user.id);
  const hasSaved = !!question.savedBy.find((u) => u.id === user.id);

  return (
    <>
      <div className="flex justify-start w-full flex-col">
        <div className="w-full flex flex-col sm:flex-row justify-between">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question?.author.picture || ""}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="font-semibold">{question.author.name}</p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={question.id}
              userId={user.id}
              upvotes={question.upvotes.length}
              hasupVoted={hasupVoted}
              downvotes={question.downvotes.length}
              hasdownVoted={hasdownVoted}
              hasSaved={hasSaved}
            />
          </div>
        </div>
        <h2 className="font-semibold text-2xl mt-4 w-full text-left">
          {question?.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={`${getTimestamp(question.createdAt)}`}
          title=" Asked"
          textStyles="font-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(question.answers.length)}
          title=" Answers"
          textStyles="font-medium"
        />
      </div>
      <ParseHTML data={question.content} />
      <div className="mt-2 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <Link key={tag.id} href={`/tags/${tag.id}`}>
            <Badge className="bg-gradient-to-r from-orange-600 to-orange-400 font-medium w-fit flex items-center justify-center gap-2 rounded-sm border-none px-4 py-2 capitalize">
              {tag.name}
            </Badge>
          </Link>
        ))}
      </div>
      <Separator className="my-6" />
      <AllAnswers
        userId={user.id}
        totalAnswers={question.answers.length}
        answers={question.answers}
      />
      <Answer questionId={question.id} authorId={user.id} />
    </>
  );
};

export default QuestionByIdPage;
