"use client";
import { Fragment, useRef } from "react";
import { Comment } from "@/types/track";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CommentItem } from "@/components/CommentItem";
import { useInput } from "@/hooks/useInput";

interface Props {
  comments: Comment[];
  trackId: string | undefined;
}

const commentTrack = async (payload: {
  username: string;
  text: string;
  trackid: string;
}): Promise<Comment> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/tracks/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};
export const Comments = ({ comments, trackId }: Props) => {
  const userName = useInput("");
  const comment = useInput("");
  const addComment = () => {
    const payload = {
      username: userName.value,
      text: comment.value,
      trackid: trackId ?? "",
    };
    commentTrack(payload);
  };
  return (
    <Fragment>
      <h2>Comments</h2>
      <TextField
        label="Username"
        fullWidth={true}
        color="secondary"
        {...userName}
      />
      <TextField
        label="Comment"
        fullWidth={true}
        multiline
        maxRows={4}
        color="secondary"
        {...comment}
      />
      <Button onClick={addComment}>Comment</Button>
      {comments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </Fragment>
  );
};
