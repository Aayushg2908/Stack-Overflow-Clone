"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LeftSidebar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <section className="dark:bg-[#0F1117] custom-scrollbar sticky top-0 left-0 flex flex-col h-screen justify-between overflow-y-auto pt-36 p-6 shadow-md dark:shadow-none max-sm:hidden lg:w-[300px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") {
            if (userId) {
              link.route = `${link.route}/${userId}`;
            } else {
              return null;
            }
          }

          return (
            <Link
              key={link.route}
              href={link.route}
              className={cn(
                "flex items-center justify-start gap-4 bg-transparent p-4",
                isActive &&
                  "bg-gradient-to-r from-orange-600 to-orange-400 rounded-lg"
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={cn(isActive ? "" : "invert dark:invert-0")}
              />
              <p
                className={cn(
                  "max-lg:hidden text-lg",
                  isActive ? "font-bold text-white" : "font-normal"
                )}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
