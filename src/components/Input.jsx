import { useState } from "react";
import Card from "./Card";

export default function Input({ addComment, addReply, replyTargetId }) {
  const [input, setInput] = useState("");
  const textAreaDisabled = input.length === 0;

  const handleSend = () => {
    if (replyTargetId) {
      // If there's a replyTargetId, add a reply
      addReply(replyTargetId, input);
      console.log(input);
    } else {
      // If no replyTargetId, add a top-level comment
      addComment(input);
      console.log(input);
    }

    setInput("");
  };

  return (
    <Card>
      <div className="flex items-center justify-center gap-4">
        <textarea
          placeholder="Add a comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />

        <button
          type="button"
          disabled={textAreaDisabled}
          onClick={handleSend}
          className="bg-moderateBlue px-4 py-2 rounded-lg text-White font-medium disabled:bg-LightGray disabled:text-GrayishBlue"
        >
          SEND
        </button>
      </div>
    </Card>
  );
}
