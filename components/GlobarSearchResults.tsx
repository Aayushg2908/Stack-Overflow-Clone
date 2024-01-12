"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { getGlobalSearchResults } from "@/actions/global";

export const GlobarSearchResults = () => {
  const searchParams = useSearchParams();

  const [result, setResult] = useState([
    { type: "question", title: "React", id: "1" },
    { type: "answer", title: "React", id: "2" },
    { type: "user", title: "React", id: "3" },
    { type: "tag", title: "React", id: "4" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const value = searchParams.get("value");

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);

      try {
        const res = await getGlobalSearchResults(value!);
        console.log(res);
        // @ts-ignore
        setResult(res);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    if (value) {
      fetchResults();
    }
  }, [value]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="absolute top-full z-10 mt-1 w-1/3 rounded-xl bg-slate-200 dark:bg-neutral-900 py-5 shadow-sm dark:bg-dark-400 transition-all duration-100 space-y-5">
      <h1 className="font-bold text-xl px-5">Top Match</h1>
      {isLoading ? (
        <div className="flex items-center justify-center flex-col px-5">
          <Loader2 className="my-2 h-10 w-10 animate-spin" />
          <p className="font-normal">Browsing the entire database</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {result.length > 0 ? (
            result.map((item) => (
              <Link
                href={renderLink(item.type, item.id)}
                key={item.id}
                className="flex w-full items-start hover:bg-slate-100 dark:hover:bg-neutral-800 gap-3 px-5 py-2.5"
              >
                <Image
                  src="/assets/icons/tag.svg"
                  alt="tags"
                  width={18}
                  height={18}
                  className="invert dark:invert-0 mt-1 object-contain"
                />
                <div className="flex flex-col">
                  <p className="font-medium line-clamp-1 text-lg">
                    {item.title}
                  </p>
                  <Badge className="text-xs w-fit">{item.type}</Badge>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center flex-col px-5">
              <p className="font-normal px-5 py-2.5">Oops, no results found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
