import { getAllQuestions } from "@/actions/question";
import NoResult from "@/components/NoResult";
import { QuestionCard } from "@/components/QuestionCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const questions = await getAllQuestions();

  return (
    <>
      <div className="w-full flex justify-between sm:items-center flex-col gap-4 sm:flex-row">
        <h1 className="font-bold text-3xl tracking-tight">All Questions</h1>
        <Link
          className={cn(
            buttonVariants({
              className: "bg-gradient-to-r from-orange-600 to-orange-400",
            })
          )}
          href="/ask-question"
        >
          Ask a Question
        </Link>
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
