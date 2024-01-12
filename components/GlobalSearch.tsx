"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter } from "next/navigation";
import { GlobarSearchResults } from "./GlobarSearchResults";

const GlobalSearch = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        searchRef.current &&
        // @ts-ignore
        !searchRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setValue("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value) {
        const url = `/?value=${value}`;
        router.push(url, { scroll: false });
      } else {
        router.push("/", { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [value, router]);

  return (
    <div className="hidden lg:block w-1/3" ref={searchRef}>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setIsOpen(true);
          if (e.target.value === "" && isOpen) setIsOpen(false);
        }}
        className="rounded-xl"
        placeholder="Search..."
      />
      {isOpen && <GlobarSearchResults />}
    </div>
  );
};

export default GlobalSearch;
