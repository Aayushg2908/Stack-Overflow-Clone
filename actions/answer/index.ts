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
  let updateData = {};

  if (hasdownVoted) {
    updateData = {
      downvotes: {
        disconnect: {
          id: userId,
        },
      },
    };
  } else if (hasupVoted) {
    updateData = {
      upvotes: {
        disconnect: {
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

  await db.answer.update({
    where: {
      id: answerId,
    },
    data: updateData,
  });

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
  let updateData = {};

  if (hasupVoted) {
    updateData = {
      upvotes: {
        disconnect: {
          id: userId,
        },
      },
    };
  } else if (hasdownVoted) {
    updateData = {
      downvotes: {
        disconnect: {
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

  await db.answer.update({
    where: {
      id: answerId,
    },
    data: updateData,
  });

  revalidatePath(path);
};

export const deleteAnswer = async ({
  id,
  path,
}: {
  id: string;
  path: string;
}) => {
  await db.answer.update({
    where: {
      id,
    },
    data: {
      author: {
        update: {
          reputation: {
            decrement: 10,
          },
        },
      },
    },
  });

  await db.answer.delete({
    where: {
      id,
    },
  });

  revalidatePath(path);
};
