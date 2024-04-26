import { Comment } from "@/types/track";

interface Props {
    comment: Comment;
}
export const CommentItem = ({comment}:Props) => (
  <div className="flex flex-col gap-2">
    <div>{comment.username}</div>
    <div>{comment.text}</div>
  </div>
)