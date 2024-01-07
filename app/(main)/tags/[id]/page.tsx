import { getTagById } from "@/actions/tags";
import NoResult from "@/components/NoResult";
import { QuestionCard } from "@/components/QuestionCard";

const TagByIdPage = async ({ params }: { params: { id: string } }) => {
  const tag = await getTagById(params.id);

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="font-bold text-3xl tracking-tight">{tag?.name}</h1>
      <div className="mt-6">
        {tag?.questions && tag.questions.length > 0 ? (
          <div className="flex flex-col gap-y-4">
            {tag.questions.map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                createdAt={question.createdAt}
              />
            ))}
          </div>
        ) : (
          <NoResult
            title="There’s no tag question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </div>
  );
};

export default TagByIdPage;
