import React, { useEffect, useState } from "react";
import Input from "./Input";
import Card from "./Card";
import { ReplyIcon } from "./Icons";
import { useReply, useReplyInput } from "./hooks/useReply";
import { useLocalStorage } from "./hooks/useLocalStorage";

const EachComment = ({
  comment,
  currentUserId,
  deleteComment,
  replyTargetId,
}) => {
  const canReply = Boolean(currentUserId);
  const canEdit = comment.id === currentUserId;
  const canDelete = comment.id === currentUserId;

  const localStorageKey = `reply_${comment.id}`;

  // using custom hooks
  const { replies, addReply, deleteReply } = useReply(
    comment.replies,
    localStorageKey
  );
  const { isReplying, toggleReplying } = useReplyInput();
  const { value, setStorageValue } = useLocalStorage();

  return (
    <div className="flex flex-col gap-4 pl-6">
      <Card>
        {/* username - reply btn */}
        <div className="flex sm:flex-col lg:flex-row justify-between items-center">
          {/* left */}
          <div className="flex gap-2 justify-center items-center bg-green-400">
            <span className="w-[40px] h-[40px]">
              <img src={comment.user.image.png} className="object-cover" />
            </span>
            <p className="font-bold text-DarkBlue">anonymous</p>
            <p className="text-GrayishBlue">{comment.createdAt}</p>
            {/* id */}
            <strong className="text-GrayishBlue">ID: {comment.id}</strong>
          </div>
          {/* content here on small screen */}
          <p className="w-[80%] md:hidden text-GrayishBlue">
            {comment.content}
          </p>

          <div className="flex w-[100%] md:w-auto bg-red-300 justify-between">
            {/* rating */}
            <div className="md:hidden">rating</div>

            {/* right */}
            <button onClick={toggleReplying}>
              <div className="text-moderateBlue font-medium flex gap-2 items-center">
                {!isReplying ? (
                  <>
                    <ReplyIcon />
                    REPLY
                  </>
                ) : (
                  "CANCEL"
                )}
              </div>
            </button>
          </div>
          {/* optional buttons */}
          {canEdit && <button>edit</button>}
          <button onClick={() => deleteComment(comment.id)}>delete</button>
          {/* {canDelete && (
          )} */}
        </div>

        {/* text */}
        <p className="w-[80%] sm:hidden md:block text-GrayishBlue">
          {comment.content}
        </p>
        {isReplying && (
          <Input addReply={addReply} replyTargetId={replyTargetId} />
        )}
      </Card>

      {/* Iterate through each comment's replies */}
      {replies?.map((reply) => (
        <EachComment
          comment={reply}
          key={reply.id}
          currentUserId={currentUserId}
          deleteComment={deleteComment}
          replyTargetId={reply.id}
        />
      ))}
    </div>
  );
};

export default EachComment;
