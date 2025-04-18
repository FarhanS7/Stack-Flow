import Image from "next/image";
import Link from "next/link";
import RenderTags from "../RenderTags";

const RightSidebar = () => {
  const hotQuestions = [
    { id: 1, title: "How to use React?", votes: 10, answers: 5 },
    { id: 2, title: "What is Next.js?", votes: 20, answers: 10 },
    { id: 3, title: "How to use Tailwind CSS?", votes: 15, answers: 8 },
    { id: 4, title: "What is TypeScript?", votes: 5, answers: 2 },
    { id: 5, title: "How to use Redux?", votes: 8, answers: 3 },
  ];
  const PopularTags = [
    { id: 1, name: "React", totalQuestions: "5" },
    { id: 2, name: "Next.js", totalQuestions: "10" },
    { id: 3, name: "Tailwind CSS", totalQuestions: "8" },
    { id: 4, name: "TypeScript", totalQuestions: "2" },
    { id: 5, name: "Redux", totalQuestions: "3" },
    { id: 6, name: "JavaScript", totalQuestions: "5" },
  ];
  return (
    <section
      className="bg-white dark:bg-gray-900
border border-gray-200 dark:border-gray-900 sticky right-0 top-0 flex h-screen flex-col justify-between
overflow-y-auto border-r p-6 pt-36 shadow-md dark:shadow-none max-sm:hidden lg:w-[350px]"
    >
      <div>
        <h3 className="font-bold text-gray-900 dark:text-gray-100">
          Top Questions
        </h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question.id}`}
              key={question.id}
              className="cursor-pointer flex items-center justify-between gap-7 "
            >
              <p className="body-medium text-gray-900 dark:text-gray-100">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                alt="arrow-right"
                className="invert dark:invert-0"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-gray-900 dark:text-gray-100">
          Popular Tags
        </h3>
        <div className="mt-7 flex flex-col gap-4">
          {PopularTags.map((Tags) => (
            <RenderTags
              _id={Tags.id}
              name={Tags.name}
              totalQuestions={Tags.totalQuestions}
              key={Tags.id}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
