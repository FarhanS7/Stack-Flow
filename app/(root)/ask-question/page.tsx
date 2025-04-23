import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const page = async () => {
  // const { userId } = await auth();

  const userId = "clerk_001";

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  console.log(mongoUser);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Ask a question
      </h1>
      <div>
        <Question mongoUserId ={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default page;
