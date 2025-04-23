"use client";

import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constant";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const LeftSidebar = () => {
  const pathname = usePathname();

  const linkItems = useMemo(() => {
    return sidebarLinks.map((item) => {
      const isActive =
        (pathname.includes(item.route) && item.route.length > 1) ||
        pathname === item.route;

      return (
        <Link
          key={item.route}
          href={item.route}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
            isActive ? "bg-orange-500 dark:bg-orange-700" : ""
          }`}
        >
          <Image
            src={item.imgURL}
            alt={item.label}
            width={20}
            height={20}
            className={`${isActive ? "" : "invert dark:invert-0"}`}
          />
          <span
            className={`${
              isActive ? "font-bold" : "font-medium"
            } max-lg:hidden`}
          >
            {item.label}
          </span>
        </Link>
      );
    });
  }, [pathname]);

  return (
    <section
      className="bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-900 sticky left-0 top-0 flex h-screen flex-col justify-between
      overflow-y-auto border-r p-6 pt-36 shadow-md dark:shadow-none max-sm:hidden lg:w-[266px]"
    >
      <div className="flex flex-1 flex-col gap-6">{linkItems}</div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="btn-secondary min-h-[41px] rounded-lg px-4 py-3 shadow-none w-full cursor-pointer">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert dark:invert-0 lg:hidden"
              />
              <span className="text-gray-900 dark:text-gray-100">Log In</span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="btn-secondary min-h-[41px] rounded-lg px-4 py-3 shadow-none w-full cursor-pointer">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
              />
              Sign Up
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default React.memo(LeftSidebar);
