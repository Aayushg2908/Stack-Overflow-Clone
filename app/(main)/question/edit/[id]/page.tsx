import { getUser } from "@/actions/user";
import { QuestionForm } from "@/components/QuestionForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import React from "react";

const EditQuestionPage = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await getUser(userId);
  if (!user) {
    return null;
  }

  const question = await db.question.findUnique({
    where: {
      id: params.id,
    },
    include: {
      tags: true,
    },
  });
  if (!question) {
    return notFound();
  }

  return (
    <>
      <h1 className="font-bold text-2xl">Edit Question</h1>
      <div className="mt-10">
        <QuestionForm type="Edit" userId={user.id} questionDetails={question} />
      </div>
    </>
  );
};

export default EditQuestionPage;
