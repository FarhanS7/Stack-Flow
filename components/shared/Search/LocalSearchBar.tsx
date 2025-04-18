"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeHolder: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeHolder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div
      className={`  flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 relative flex min-h-[56px] rounded-xl shadow-sm items-center px-4 w-full">
        <Input
          type="search"
          placeholder={placeHolder}
          value=""
          onChange={() => {}}
          className="text-sm placeholder:text-gray-400 bg-transparent border-none shadow-none outline-none w-full"
        />
        {iconPosition === "right" && (
          <Image
            src={imgSrc}
            alt="search"
            width={24}
            height={24}
            className="cursor-pointer ml-2"
          />
        )}
      </div>
    </div>
  );
};

export default LocalSearchBar;
