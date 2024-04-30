import { Comment } from "@/types/track";

interface Props {
  comment: Comment;
}
export const CommentItem = ({ comment }: Props) => (
  <div className="flex flex-col gap-2 border border-solid border-black/20 rounded-md pd">
    <div className="font-semibold text-lg">{comment.username}</div>
    <div>{comment.text}</div>
  </div>
);
