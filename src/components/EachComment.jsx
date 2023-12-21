import Input from "./Input";
import Card from "./Card";
import { ReplyIcon } from "./Icons";
import { useReply, useReplyInput } from "./hooks/useReply";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { FaTrash } from "react-icons/fa";
import { useRating } from "./hooks/useRating";

const EachComment = ({
  comment,
  currentUserId,
  deleteComment,
  replyTargetId,
}) => {
  const localStorageKey = `reply_${comment.id}`;

  // using custom hooks
  const { increaseRating, decreaseRating, rating } = useRating();

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
          <div className="flex gap-2 justify-center items-center">
            <span className="w-[40px] h-[40px]">
              <img src={comment.user.image.png} className="object-cover" />
            </span>
            <p className="font-bold text-DarkBlue">
              {
                // if username is not null, show username, else show anonymous
                comment.user.username !== undefined
                  ? comment.user.username
                  : "anonymous"
              }
            </p>
            <p className="text-GrayishBlue">{comment.createdAt}</p>
            {/* id */}
            <strong className="sm:hidden md:block text-GrayishBlue">
              ID: {comment.id}
            </strong>
          </div>
          {/* content here on small screen */}
          <p className="w-[80%] md:hidden py-4 text-GrayishBlue">
            {comment.content}
          </p>

          <div className="flex w-[100%] gap-2 md:w-auto justify-between">
            {/* rating */}
            {/* user can't rate their own comment */}

            {comment.user.username === undefined ? (
              <button
                onClick={() => deleteComment(comment.id)}
                className=" text-red-600 flex gap-1 py-2 items-center"
              >
                <FaTrash />
                Delete
              </button>
            ) : (
              ""
            )}

            {comment.user.username && (
              <div className="bg-LightGray p-3 rounded-md flex gap-3">
                <button onClick={decreaseRating}>-</button>
                {rating}
                <button onClick={increaseRating}>+</button>
              </div>
            )}
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
          {/* optional buttons - delete and edit */}
        </div>

        {/* text */}
        <p className="w-[80%] sm:hidden md:block py-4 text-GrayishBlue">
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
