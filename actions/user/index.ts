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
      questions: {
        include: {
          upvotes: true,
          downvotes: true,
          author: true,
          tags: true,
          answers: true,
        },
      },
      answers: true,
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
  let updateData = {};

  if (hasSaved) {
    updateData = {
      saved: {
        disconnect: {
          id: questionId,
        },
      },
    };
  } else {
    updateData = {
      saved: {
        connect: {
          id: questionId,
        },
      },
    };
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: updateData,
  });

  revalidatePath(path);
};

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      clerkId: id,
    },
  });

  return user;
};

export const updateUser = async ({
  clerkId,
  updateData,
  path,
}: {
  clerkId: string;
  updateData: {
    name: string;
    bio: string;
    username: string;
    portfolioWebsite: string;
    location: string;
  };
  path: string;
}) => {
  await db.user.update({
    where: {
      clerkId,
    },
    data: {
      ...updateData,
    },
  });

  revalidatePath(path);
};
