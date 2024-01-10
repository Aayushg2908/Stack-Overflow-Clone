"use server";

import { db } from "@/lib/db";

export const getAllTags = async (name: string) => {
  const tags = await db.tags.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    include: {
      questions: true,
    },
  });

  return tags;
};

export const getTagById = async (id: string) => {
  const tag = await db.tags.findUnique({
    where: {
      id,
    },
    include: {
      questions: {
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

  return tag;
};
