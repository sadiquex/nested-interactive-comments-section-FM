import { useState } from "react";
import Card from "./Card";

export default function Input({ addComment }) {
  const [input, setInput] = useState("");

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
          onClick={() => {
            addComment(input);
            setInput("");
          }}
          className="bg-moderateBlue px-4 py-2 rounded-lg text-White font-medium"
        >
          SEND
        </button>
      </div>
    </Card>
  );
}
