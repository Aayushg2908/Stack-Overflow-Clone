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
        author: {
          update: {
            reputation: {
              decrement: 10,
            },
          },
        },
      },
    });
  } else {
    if (hasdownVoted) {
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
          downvotes: {
            disconnect: {
              id: userId,
            },
          },
          author: {
            update: {
              reputation: {
                increment: 20,
              },
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
          author: {
            update: {
              reputation: {
                increment: 10,
              },
            },
          },
        },
      });
    }
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
        author: {
          update: {
            reputation: {
              increment: 10,
            },
          },
        },
      },
    });
  } else {
    if (hasupVoted) {
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
          upvotes: {
            disconnect: {
              id: userId,
            },
          },
          author: {
            update: {
              reputation: {
                decrement: 20,
              },
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
          author: {
            update: {
              reputation: {
                decrement: 10,
              },
            },
          },
        },
      });
    }
  }

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

export const getPopularTags = async () => {
  const tags = await db.tags.findMany({
    orderBy: {
      questions: {
        _count: "desc",
      },
    },
    take: 2,
  });

  return tags;
};
