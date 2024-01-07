"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface createQuestion {
  title: string;
  content: string;
  tags: string[];
  author: string;
  path: string;
}

export const createQuestion = async (input: createQuestion) => {
  const { title, content, tags, author, path } = input;

  const question = await db.question.create({
    data: {
      title,
      content,
      authorId: author,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });

  await db.user.update({
    where: {
      id: author,
    },
    data: {
      reputation: {
        increment: 5,
      },
    },
  });

  revalidatePath(path);
};

export const getAllQuestions = async () => {
  const questions = await db.question.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      upvotes: true,
      downvotes: true,
      author: true,
    },
  });

  return questions;
};