"use client";

import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="assets/icons/hamburger.svg"
          width={40}
          height={40}
          alt="Menu"
          className="sm:hidden invert dark:invert-0"
        />
      </SheetTrigger>
      <SheetContent className="dark:bg-[#0F1117]" side="left">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/site-logo.svg" width={23} height={23} alt="DevFlow" />
          <p className="font-bold text-2xl ml-1">
            Stack<span className="text-orange-500">Overflow</span>
          </p>
        </Link>
        <SheetClose asChild>
          <section className="flex h-full flex-col gap-6 pt-16">
            {sidebarLinks.map((link) => {
              const isActive =
                (pathname.includes(link.route) && link.route.length > 1) ||
                pathname === link.route;

              return (
                <SheetClose asChild key={link.route}>
                  <Link
                    href={link.route}
                    className={cn(
                      "flex items-center justify-start gap-4 bg-transparent p-4",
                      isActive &&
                        "bg-gradient-to-r from-orange-600 to-orange-300 rounded-lg text-white"
                    )}
                  >
                    <Image
                      src={link.imgURL}
                      alt={link.label}
                      width={20}
                      height={20}
                      className={cn(isActive ? "" : "invert dark:invert-0")}
                    />
                    <p className={cn(isActive ? "font-bold" : "font-normal")}>
                      {link.label}
                    </p>
                  </Link>
                </SheetClose>
              );
            })}
          </section>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};
