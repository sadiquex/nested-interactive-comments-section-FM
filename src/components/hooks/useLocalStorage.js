// import { useState, useEffect } from "react";

// export const useLocalStorage = (initialComments, localStorageKey) => {
//   const [comments, setComments] = useState(() => {
//     const storedComments = localStorage.getItem(localStorageKey);
//     return storedComments ? JSON.parse(storedComments) : initialComments;
//   });

//   useEffect(() => {
//     localStorage.setItem(localStorageKey, JSON.stringify(comments));
//   }, [comments, localStorageKey]);

//   const addComment = (newComment) => {
//     setComments((prevComments) => [newComment, ...prevComments]);
//   };

//   const deleteComment = (commentId) => {
//     const updatedComments = comments.filter(
//       (comment) => comment.id !== commentId
//     );
//     setComments(updatedComments);
//   };

//   return { comments, addComment, deleteComment };
// };

export const useLocalStorage = () => {
  return {};
};
