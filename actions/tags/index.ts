"use server";

import { db } from "@/lib/db";

export const getAllTags = async () => {
  const tags = await db.tags.findMany({
    include: {
      questions: true,
    },
  });

  return tags;
};
