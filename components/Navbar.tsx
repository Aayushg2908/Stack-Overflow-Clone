import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { UserButton } from "@clerk/nextjs";
import { MobileNav } from "./MobileNav";

export const Navbar = () => {
  return (
    <nav className="dark:bg-[#0F1117] w-full flex items-center justify-between fixed z-50 gap-5 p-6 shadow-md dark:shadow-none sm:px-12 backdrop-blur-3xl">
      <Link href="/" className="flex items-center gap-1.5">
        <Image src="/site-logo.svg" width={23} height={23} alt="Logo" />
        <p className="hidden sm:inline-block text-2xl tracking-tight font-bold">
          Stack<span className="text-orange-500">Overflow</span>
        </p>
      </Link>
      <div className="flex items-center justify-between gap-5">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
            },
            variables: {
              colorPrimary: "#ff4d00",
            },
          }}
        />
        <MobileNav />
      </div>
    </nav>
  );
};
