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
          className="text-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400
             bg-transparent border-0   ml-2 px-4 py-2 min-w-[500px]"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
