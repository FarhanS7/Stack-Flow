import LocalSearchBar from "@/components/shared/Search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-dark100_light900">
          All Questions
        </h1>
        <Link href="/ask-questions" className="flex justify-end max-sm:w-full">
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:brightness-110 text-white min-h-[46px] px-4 py-3 transition">
            Ask A question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="right"
          imgSrc="/assets/icons/search.svg"
          placeHolder="Search"
          otherClasses="flex-1"
        />
      </div>
    </>
  );
};

export default Home;
