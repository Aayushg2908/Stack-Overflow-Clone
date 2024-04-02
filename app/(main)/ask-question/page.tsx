import { getUserById } from "@/actions/user";
import { QuestionForm } from "@/components/QuestionForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AskQuestionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await getUserById(userId);
  if (!user) {
    return null;
  }

  return (
    <div>
      <h1 className="font-bold text-3xl tracking-tight">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm userId={user?.id} />
      </div>
    </div>
  );
};

export default AskQuestionPage;
