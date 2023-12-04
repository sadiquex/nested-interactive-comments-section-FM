import React, { useEffect } from "react";
import { useState } from "react";
import Input from "./Input";
import Card from "./Card";
import { ReplyIcon } from "./Icons";

const EachComment = ({ comment, username }) => {
  const [isReplying, setIsReplying] = useState(false);

  // Create a unique key for each comment
  const localStorageKey = `replies_${comment.id}`;

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
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      const newReply = {
        id: Math.ceil(Math.random() * 1000),
        content: userInput,
        createdAt: `at ${hours} : ${minutes} GMT`,
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
        <div className="flex justify-between items-center">
          {/* left */}
          <div className="flex gap-2 justify-center items-center">
            <span className="w-[40px] h-[40px]">
              <img src={comment.user.image.png} className="object-cover" />
            </span>
            <p className="font-bold text-DarkBlue">
              {!username ? "anonymous" : comment.username}
            </p>
            <p className="text-GrayishBlue">{comment.createdAt}</p>
          </div>
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

        {/* text */}
        <p className="w-[80%] text-GrayishBlue">{comment.content}</p>
        {isReplying && <Input addComment={addReply} />}
      </Card>

      {/* iterate through each comment's replies */}
      {replies?.map((reply) => (
        <EachComment comment={reply} key={reply.id} />
      ))}
    </div>
  );
};

export default EachComment;
