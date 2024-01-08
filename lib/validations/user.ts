import * as z from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  bio: z.string().min(10).max(500),
  username: z.string().min(5).max(15),
  portfolioWebsite: z.string().url(),
  location: z.string().min(5).max(50),
});
