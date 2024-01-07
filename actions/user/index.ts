"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      clerkId: id,
    },
    include: {
      saved: {
        include: {
          tags: true,
          author: true,
          upvotes: true,
          downvotes: true,
          answers: true,
        },
      },
    },
  });

  return user;
};

export const getAllUsers = async () => {
  const users = await db.user.findMany();

  return users;
};

export const toggleSaveQuestion = async ({
  userId,
  questionId,
  hasSaved,
  path,
}: {
  userId: string;
  questionId: string;
  hasSaved: boolean;
  path: string;
}) => {
  if (hasSaved) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        saved: {
          disconnect: {
            id: questionId,
          },
        },
      },
    });
  } else {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        saved: {
          connect: {
            id: questionId,
          },
        },
      },
    });
  }

  revalidatePath(path);
};
