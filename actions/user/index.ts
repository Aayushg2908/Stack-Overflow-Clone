"use server";

import { db } from "@/lib/db";

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
