import { useEffect, useState } from "react";
import data from "./../data.json";
import Input from "./components/Input";
import EachComment from "./components/EachComment";

function App() {
  const [replyTargetId, setReplyTargetId] = useState(null);

  // persist data to LS
  const [comments, setComments] = useState(data.comments);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  // function to add user input to top level comments
  const addComment = (userInput) => {
    if (userInput.trim() !== "") {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      const newComment = {
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

      setReplyTargetId(null);
      // add to comments' array
      setComments((prev) => [newComment, ...prev]);
    }
  };

  const deleteComment = (commentId) => {
    console.log(commentId);
    if (window.confirm("Are you sure?")) {
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);
    }
  };

  return (
    <div className="sm:h-auto md:pt-0 py-6 px-4 flex flex-col gap-3 items-center justify-center md:h-[100vh] bg-veryLightGray">
      {/* all the comments */}
      <div className="flex flex-col gap-2">
        {comments.map((cmt, i) => (
          <EachComment
            key={i}
            comment={cmt}
            currentUserId={1}
            deleteComment={deleteComment}
          />
        ))}
      </div>
      {/* input for top level comment */}
      <Input addComment={addComment} />
    </div>
  );
}

export default App;
