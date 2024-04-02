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

export const getAllQuestions = async (title: string) => {
  const questions = await db.question.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
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
  if (hasupVoted) {
    await db.question.update({
      where: {
        id: questionId,
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
      await db.question.update({
        where: {
          id: questionId,
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
      await db.question.update({
        where: {
          id: questionId,
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
  if (hasdownVoted) {
    await db.question.update({
      where: {
        id: questionId,
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
      await db.question.update({
        where: {
          id: questionId,
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
      await db.question.update({
        where: {
          id: questionId,
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
