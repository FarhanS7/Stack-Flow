import { Input } from "@/components/ui/input";
import Image from "next/image";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 relative flex min-h-[56px] rounded-xl shadow-sm  items-center px-4 ">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer "
        />
        <Input
          type="search"
          placeholder="Search"
          value=""
          className="paragraph-regular text-gray-900 dark:text-gray-100 no-focus placeholder shadow-none bg-transparent border-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-transparent focus-visible:border-0 focus-visible:shadow-none placeholder:text-gray-500 dark:placeholder:text-gray-400 ml-2"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
