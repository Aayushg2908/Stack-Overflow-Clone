import { getUserById } from "@/actions/user";
import { ProfileLink } from "@/components/ProfileLink";
import { buttonVariants } from "@/components/ui/button";
import { cn, getJoinedDate } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionCard } from "@/components/QuestionCard";
import { AnswerCard } from "@/components/AnswerCard";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await getUserById(params.id);
  if (!user) {
    return null;
  }

  let badge;
  if (user.reputation < 5) {
    badge = null;
  } else if (user.reputation < 10) {
    badge = "/assets/icons/bronze-medal.svg";
  } else if (user.reputation < 20) {
    badge = "/assets/icons/silver-medal.svg";
  } else {
    badge = "/assets/icons/gold-medal.svg";
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2">
        <div className="flex flex-col sm:flex-row gap-4">
          <Image
            src={user.picture || ""}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col gap-1 justify-center">
            <h1 className="font-bold text-2xl">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <div className="mt-2 flex gap-2 items-center">
              {user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={user.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={user.location}
                />
              )}
              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(user.createdAt)}
              />
            </div>
            <p className="font-normal text-sm mt-1">{user.bio}</p>
          </div>
        </div>
        {userId === user?.clerkId && (
          <Link
            href="/profile/edit"
            className={cn(
              buttonVariants({
                className: "w-full sm:w-fit",
              })
            )}
          >
            Edit Profile
          </Link>
        )}
      </div>
      <div className="mt-10 ml-2 flex flex-col gap-y-2">
        <h1 className="font-bold text-2xl">Stats -</h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="dark:bg-[#0F1117] shadow-md dark:shadow-none flex items-center justify-around h-[150px]">
            <div className="font-semibold">
              {user.questions.length} - Questions
            </div>
            <div className="font-semibold">{user.answers.length} - Answers</div>
          </div>
          <div className="dark:bg-[#0F1117] flex items-center justify-center shadow-md dark:shadow-none h-[150px]">
            You Have{" "}
            {badge ? (
              <Image
                className="mx-2"
                src={badge}
                alt="badge"
                width={25}
                height={25}
              />
            ) : (
              "No"
            )}{" "}
            Badge
          </div>
        </div>
      </div>
      <div className="mt-10 ml-2">
        <Tabs defaultValue="Questions">
          <TabsList className="min-h-[42px] p-1">
            <TabsTrigger value="Questions" className="tab">
              Questions
            </TabsTrigger>
            <TabsTrigger value="Answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="Questions"
            className="mt-5 flex w-full flex-col gap-6"
          >
            {user.questions.map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                clerkId={userId}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            ))}
          </TabsContent>
          <TabsContent value="Answers" className="flex w-full flex-col gap-6">
            {user.answers.map((answer) => (
              <AnswerCard
                key={answer.id}
                id={answer.id}
                clerkId={userId}
                author={answer.author}
                question={answer.question}
                upvotes={answer.upvotes.length}
                createdAt={answer.createdAt}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;
