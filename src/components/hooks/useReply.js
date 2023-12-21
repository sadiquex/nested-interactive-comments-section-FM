import React, { useEffect, useState } from "react";
import { getDateFunction } from "../utils";

// Custom hook for handling replies
export const useReply = (initialReplies, localStorageKey) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(replies));
  }, [localStorageKey, replies]);

  const addReply = (replyId, userInput) => {
    if (userInput.trim() !== "") {
      const newReply = {
        id: Math.ceil(Math.random() * 1000),
        content: userInput,
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

  const deleteReply = (replyId) => {
    console.log(replyId);
    if (window.confirm("Are you sure?")) {
      const updatedReplies = replies.filter((reply) => reply.id !== replyId);
      setReplies(updatedReplies);
    }
  };

  return { replies, addReply, deleteReply };
};

// hook for handling reply inputs
export const useReplyInput = () => {
  const [isReplying, setIsReplying] = useState(false);

  const toggleReplying = () => {
    setIsReplying((prev) => !prev);
  };

  return { isReplying, toggleReplying };
};
