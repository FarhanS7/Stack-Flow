import Link from "next/link";
import { Badge } from "../ui/badge";
interface Props {
  _id: number;
  name: string;
  totalQuestions: string;
  showCount?: boolean;
}

const RenderTags = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="font-medium text-sm bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      <Badge>
        {showCount && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {totalQuestions}
          </p>
        )}
      </Badge>
    </Link>
  );
};

export default RenderTags;
