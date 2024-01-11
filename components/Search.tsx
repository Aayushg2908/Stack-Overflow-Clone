"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter } from "next/navigation";

interface SearchProps {
  query: string;
}

export const Search = ({ query }: SearchProps) => {
  const [searchParams, setSearchParams] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";
      if (searchParams) {
        newUrl = `${pathname}?${query}=${searchParams}`;
      } else {
        newUrl = pathname;
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchParams, router]);

  return (
    <div className="my-5 flex">
      <Input
        className="rounded-xl"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
        placeholder={`Search by ${query}`}
      />
    </div>
  );
};
