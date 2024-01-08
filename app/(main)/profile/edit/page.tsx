import { getUser } from "@/actions/user";
import Profile from "@/components/Profile";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const EditProfilePage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await getUser(userId);
  if (!user) {
    return null;
  }

  return (
    <>
      <h1 className="font-bold text-3xl">Profile</h1>
      <div className="mt-9">
        <Profile clerkId={userId} user={user} />
      </div>
    </>
  );
};

export default EditProfilePage;
