"use client";

import { deleteAnswer } from "@/actions/answer";
import { deleteQuestion } from "@/actions/question";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/question/edit/${itemId}`);
  };

  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({
        id: itemId,
        path: pathname,
      });
      toast.success("Question deleted successfully");
    } else if (type === "Answer") {
      await deleteAnswer({
        id: itemId,
        path: pathname,
      });
      toast.success("Answer deleted successfully");
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
