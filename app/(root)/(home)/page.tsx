import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filters/filters";
import LocalSearchBar from "@/components/shared/Search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constant/filters";
import { getQuestions } from "@/lib/actions/question.action";

import QuestionCard from "@/components/cards/QuestionCard"; // ✅ You forgot this import!
import Link from "next/link";

const questions = [
  {
    _id: 1,
    title: "How to use React?",
    author: {
      name: "John Doe",
      _id: "1",
      picture: "/assets/images/people/1.png",
    },
    description: "I am new to React and I want to learn how to use it.",
    tags: ["React", "JavaScript"],
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date("2023-10-01T12:00:00Z"),
  },
  {
    _id: 2,
    title: "How to use Next.js?",
    author: {
      name: "Jane Smith",
      _id: "2",
      picture: "/assets/images/people/2.png",
    },
    description: "I am new to Next.js and I want to learn how to use it.",
    tags: ["Next.js", "React"],
    upvotes: 5,
    views: 50,
    answers: [],
    createdAt: new Date("2023-10-02T12:00:00Z"),
  },
];

export default async function Home() {
  const result = await getQuestions({});

  console.log(result);

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-dark100_light900">
          All Questions
        </h1>

        {/* Fixed Link and Button */}
        <Link href="/ask-question" className="w-fit">
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:brightness-110 text-white min-h-[46px] px-4 py-3 transition-none shadow-none rounded-lg">
            Ask A Question
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
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              author={question.author}
              description={question.description}
              tags={question.tags}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <img
              src="/assets/icons/empty.svg"
              alt="No questions found"
              className="h-16 w-16"
            />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              No Questions Found
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              There are no questions available at the moment.
            </p>

            {/* Fixed Link and Button inside No Questions */}
            <Link href="/ask-question" className="w-fit">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:brightness-110 text-white min-h-[46px] px-4 py-3 transition-none shadow-none rounded-lg">
                Ask A Question
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
