import { getUserById } from "@/actions/user";
import NoResult from "@/components/NoResult";
import { QuestionCard } from "@/components/QuestionCard";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CollectionPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await getUserById(userId);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl tracking-tight">Saved Questions</h1>
      <div className="mt-6">
        {user?.saved && user.saved.length > 0 ? (
          <div className="mt-6 flex flex-col gap-y-4">
            {user.saved.map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            ))}
          </div>
        ) : (
          <NoResult
            title="There’s no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
