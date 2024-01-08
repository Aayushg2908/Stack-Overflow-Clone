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

interface updateQuestion {
  questionId: string | undefined;
  title: string;
  content: string;
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
  revalidatePath("/");
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
      answers: true,
    },
  });

  return questions;
};

export const getQuestionById = async (id: string) => {
  const question = await db.question.findUnique({
    where: {
      id,
    },
    include: {
      tags: true,
      upvotes: true,
      downvotes: true,
      author: true,
      savedBy: true,
      answers: {
        include: {
          author: true,
          upvotes: true,
          downvotes: true,
        },
      },
    },
  });

  return question;
};

export const upvoteQuestion = async ({
  userId,
  questionId,
  hasupVoted,
  hasdownVoted,
  path,
}: {
  userId: string;
  questionId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}) => {
  let updateData = {};

  if (hasupVoted) {
    updateData = {
      upvotes: {
        disconnect: {
          id: userId,
        },
      },
    };
  } else {
    if (hasdownVoted) {
      updateData = {
        downvotes: {
          disconnect: {
            id: userId,
          },
        },
        upvotes: {
          connect: {
            id: userId,
          },
        },
      };
    } else {
      updateData = {
        upvotes: {
          connect: {
            id: userId,
          },
        },
      };
    }
  }

  await db.question.update({
    where: {
      id: questionId,
    },
    data: updateData,
  });

  revalidatePath(path);
};

export const downvoteQuestion = async ({
  userId,
  questionId,
  hasupVoted,
  hasdownVoted,
  path,
}: {
  userId: string;
  questionId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}) => {
  let updateData = {};

  if (hasdownVoted) {
    updateData = {
      downvotes: {
        disconnect: {
          id: userId,
        },
      },
    };
  } else {
    if (hasupVoted) {
      updateData = {
        upvotes: {
          disconnect: {
            id: userId,
          },
        },
        downvotes: {
          connect: {
            id: userId,
          },
        },
      };
    } else {
      updateData = {
        downvotes: {
          connect: {
            id: userId,
          },
        },
      };
    }
  }

  await db.question.update({
    where: {
      id: questionId,
    },
    data: updateData,
  });

  revalidatePath(path);
};

export const deleteQuestion = async ({
  id,
  path,
}: {
  id: string;
  path: string;
}) => {
  await db.question.update({
    where: {
      id,
    },
    data: {
      author: {
        update: {
          reputation: {
            decrement: 5,
          },
        },
      },
    },
  });

  await db.question.delete({
    where: {
      id,
    },
  });

  revalidatePath(path);
  revalidatePath("/");
};

export const updateQuestion = async ({
  questionId,
  title,
  content,
  path,
}: updateQuestion) => {
  await db.question.update({
    where: {
      id: questionId,
    },
    data: {
      title,
      content,
    },
  });

  revalidatePath(path);
  revalidatePath(`/question/${questionId}`);
  revalidatePath("/");
};

export const getTopQuestions = async () => {
  const questions = await db.question.findMany({
    orderBy: {
      upvotes: {
        _count: "desc",
      },
    },
    take: 4,
  });

  return questions;
};
