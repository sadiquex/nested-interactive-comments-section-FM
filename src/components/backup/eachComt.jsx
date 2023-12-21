import React, { useEffect } from "react";
import { useState } from "react";
import Input from "./Input";
import Card from "./Card";
import { ReplyIcon } from "./Icons";
import { getDateFunction } from "./utils";

const EachComment = ({ comment, currentUserId, deleteComment }) => {
  // console.log(currentUserId);

  // delete and edit functionalities depending on the userID
  const canReply = Boolean(currentUserId);
  // compare the userID to the currentUserId to see if we can edit or not
  const canEdit = comment.id === currentUserId;
  const canDelete = comment.id === currentUserId;

  // state to open reply input field
  const [isReplying, setIsReplying] = useState(false);

  // Create a unique key for each comment
  const localStorageKey = `reply_${comment.id}`;

  // create a comment state for each independent comment item
  const [replies, setReplies] = useState(() => {
    const localReplies = localStorage.getItem(localStorageKey);
    return localReplies ? JSON.parse(localReplies) : comment.replies || [];
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(replies));
  }, [localStorageKey, replies]);

  const addReply = (userInput) => {
    if (userInput.trim() !== "") {
      const newReply = {
        id: Math.ceil(Math.random() * 1000),
        content: userInput,
        // createdAt: `at ${hours} : ${minutes} GMT`,
        createdAt: getDateFunction(),
        replies: [],
        username: "anonymous",
        user: {
          image: {
            png: "",
          },
        },
      };

      setReplies((prev) => [newReply, ...(prev || [])]);
    }
  };

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
            <button onClick={() => setIsReplying(!isReplying)}>
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
          {canDelete && (
            <button onClick={() => deleteComment(comment.id)}>delete</button>
          )}
        </div>

        {/* text */}
        <p className="w-[80%] sm:hidden md:block text-GrayishBlue">
          {comment.content}
        </p>
        {isReplying && <Input addComment={addReply} />}
      </Card>

      {/* iterate through each comment's replies */}
      {replies?.map((reply) => (
        <EachComment
          comment={reply}
          key={reply.id}
          currentUserId={currentUserId}
          // deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default EachComment;
