"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const getGlobalSearchResults = async (query: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const questionResults = await db.question.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  const answerResults = await db.answer.findMany({
    where: {
      content: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  const tagResults = await db.tags.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  const userResults = await db.user.findMany({
    where: {
      username: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  const finalResults = [
    ...questionResults.map((question) => ({
      type: "question",
      id: question.id,
      title: question.title,
    })),
    ...answerResults.map((answer) => ({
      type: "answer",
      id: answer.id,
      title: answer.content,
    })),
    ...userResults.map((user) => ({
      type: "user",
      id: user.clerkId,
      title: user.username,
    })),
    ...tagResults.map((tag) => ({
      type: "tag",
      id: tag.id,
      title: tag.name,
    })),
  ];

  return finalResults;
};
