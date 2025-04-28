// inside QuestionCard.tsx

interface QuestionCardProps {
  _id: number;
  title: string;
  author: {
    name: string;
    _id: string;
    picture: string;
  };
  description: string;
  tags: string[];
  upvotes: number;
  views: number;
  answers: any[]; // or type it properly if you know answer's structure
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  author,
  description,
  tags,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionCardProps) => {
  return (
    <div>
      {/* Your QuestionCard JSX */}
      <h2>{title}</h2>
      {/* etc */}
    </div>
  );
};

export default QuestionCard;
