import { getAllTags } from "@/actions/tags";
import NoResult from "@/components/NoResult";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const TagsPage = async () => {
  const tags = await getAllTags();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl tracking-tight">All Tags</h1>
      <div className="mt-6">
        {tags.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tags.map((tag) => (
              <Link
                className="dark:bg-[#0F1117] shadow-md dark:shadow-none flex flex-col items-center justify-center gap-y-4 p-6 rounded-xl"
                href={`/tags/${tag.id}`}
              >
                <Badge className="bg-gradient-to-r from-orange-600 to-orange-400 font-medium w-fit flex items-center justify-center gap-2 rounded-lg border-none px-4 py-2 capitalize">
                  {tag.name}
                </Badge>
                <div className="text-muted-foreground">
                  <span className="text-orange-500 mr-2 font-bold">
                    +{tag.questions.length}
                  </span>
                  Questions
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </div>
    </div>
  );
};

export default TagsPage;
