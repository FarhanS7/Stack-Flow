"use client";

import { HomePageFilters } from "@/constant/filters";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const isActive = ""; // Ideally this should be state-based

  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => {}}
          className={`text-sm font-medium rounded-lg px-6 py-3 capitalize shadow-none transition ${
            isActive === filter.value
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
          }`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
