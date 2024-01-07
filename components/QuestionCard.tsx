import { Tags, User } from "@prisma/client";
import Link from "next/link";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Metric from "./Metric";

interface Props {
  id: string;
  title: string;
  tags: Tags[];
  author: User;
  upvotes: User[];
  views: number;
  createdAt: Date;
}

export const QuestionCard = ({
  id,
  title,
  tags,
  author,
  upvotes,
  views,
  createdAt,
}: Props) => {
  return (
    <div className="dark:bg-[#0F1117] shadow-md dark:shadow-none flex flex-col gap-2 rounded-xl p-9 sm:px-11">
      <Link href={`/question/${id}`}>
        <div className="font-semibold text-xl line-clamp-1">{title}</div>
      </Link>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag.id} href={`/tags/${tag.id}`}>
            <Badge className="bg-gradient-to-r from-orange-600 to-orange-400 font-medium w-fit flex items-center justify-center gap-2 rounded-sm border-none px-4 py-2 capitalize">
              {tag.name}
            </Badge>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-y-4">
        <Link
          href={`/profile/${author.clerkId}`}
          className="flex items-center gap-2"
        >
          <Image
            className="rounded-full"
            src={author.picture}
            alt="userLogo"
            width={20}
            height={20}
          />
          <div className="text-sm text-muted-foreground">
            {author.username} - {getTimestamp(createdAt)}
          </div>
        </Link>
        <div className="flex gap-3 items-center">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};
