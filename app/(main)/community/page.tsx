import { getAllUsers } from "@/actions/user";
import Image from "next/image";
import Link from "next/link";

const CommunityPage = async () => {
  const users = await getAllUsers();

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="font-bold text-3xl">All Users</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/profile/${user.clerkId}`}
            className="dark:bg-[#0F1117] shadow-md dark:shadow-none flex flex-col gap-y-2 items-center justify-center p-8 rounded-xl"
          >
            <Image
              src={user.picture}
              alt="userProfile"
              width={100}
              height={100}
              className="rounded-full"
            />
            <div className="font-bold text-xl line-clamp-1">{user.name}</div>
            <div className="text-muted-foreground">@{user.username}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
