"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { ProfileSchema } from "@/lib/validations/user";
import { updateUser } from "@/actions/user";

interface Props {
  clerkId: string;
  user: User;
}

const Profile = ({ clerkId, user }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolioWebsite: user.portfolioWebsite || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);

    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });
      router.back();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-9 flex w-full flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="font-semibold">
                Name <span className="text-orange-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  className="no-focus font-normal min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="font-semibold">
                Username <span className="text-orange-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Username"
                  className="no-focus font-normal min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="font-normal">Portfolio Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Your portfolio URL"
                  className="no-focus font-normal min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="font-semibold">Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Where are you from?"
                  className="no-focus font-normal min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="font-semibold">
                Bio <span className="text-orange-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What's special about you?"
                  className="no-focus font-normal min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-7 flex justify-end">
          <Button
            type="submit"
            className="bg-gradient-to-r from-orange-600 to-orange-400 w-fit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
