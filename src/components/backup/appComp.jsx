import { useEffect, useState } from "react";
import data from "./../data.json";
import Input from "./components/Input";
import EachComment from "./components/EachComment";

function App() {
  const { username } = data.currentUser;

  // persist data to LS
  const [comments, setComments] = useState(() => {
    const localData = localStorage.getItem("comments");
    return localData ? JSON.parse(localData) : data.comments;
  });

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
    <div className="py-6 px-4 flex flex-col gap-3 items-center justify-center bg-veryLightGray">
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

/*
1. creating the top level comments
// - create a top level input (initial comment)
// - add the top level "Comment" button
// - state to manage array of  initial (dummy) comments, and update comments when user adds a new comment
// - populate ui with dummy comments 
// - make the input stateful (accept input and add it to a state)
// - create a function on the "Comment" button to add the newly typed input to the state (comments array)
// - empty the input field after clicking the "Comment" button

2.
- create state to show the input field when the reply button on each comment is clicked - each comment should have the state to control opening or closing the input field
- for each comment, create a state to handle it's commments
- in the object of the new comment created, initialize it to have an empty array of comments - when the reply button under a comment is clicked, add it to the array of comments it has

*/
