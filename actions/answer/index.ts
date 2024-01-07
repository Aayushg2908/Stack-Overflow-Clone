"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface CreateAnswerParams {
  content: string;
  author: string;
  question: string;
  path: string;
}

export const createAnswer = async ({
  content,
  author,
  question,
  path,
}: CreateAnswerParams) => {
  const answer = await db.answer.create({
    data: {
      content,
      authorId: author,
      questionId: question,
    },
  });

  await db.user.update({
    where: {
      id: author,
    },
    data: {
      reputation: {
        increment: 10,
      },
    },
  });

  revalidatePath(path);
  revalidatePath("/");
};

export const upvoteAnswer = async ({
  userId,
  answerId,
  hasupVoted,
  hasdownVoted,
  path,
}: {
  userId: string;
  answerId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}) => {
  if (hasdownVoted) {
    await db.answer.update({
      where: {
        id: answerId,
      },
      data: {
        downvotes: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }

  if (hasupVoted) {
    await db.answer.update({
      where: {
        id: answerId,
      },
      data: {
        upvotes: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  } else {
    await db.answer.update({
      where: {
        id: answerId,
      },
      data: {
        upvotes: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  revalidatePath(path);
};

export const downvoteAnswer = async ({
  userId,
  answerId,
  hasupVoted,
  hasdownVoted,
  path,
}: {
  userId: string;
  answerId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}) => {
  if (hasupVoted) {
    await db.answer.update({
      where: {
        id: answerId,
      },
      data: {
        upvotes: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }

  if (hasdownVoted) {
    await db.answer.update({
      where: {
        id: answerId,
      },
      data: {
        downvotes: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  } else {
    await db.answer.update({
      where: {
        id: answerId,
      },
      data: {
        downvotes: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  revalidatePath(path);
};
