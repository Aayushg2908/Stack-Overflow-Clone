import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />

      <h2 className="font-bold text-xl mt-8">{title}</h2>
      <p className="font-normal my-3.5 max-w-md text-center">{description}</p>

      <Link
        className={cn(
          buttonVariants({
            className: "bg-gradient-to-r from-orange-600 to-orange-400",
          })
        )}
        href={link}
      >
        {linkTitle}
      </Link>
    </div>
  );
};

export default NoResult;
