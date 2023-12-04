import { useState } from "react";
import Card from "./Card";

export default function Input({ addComment }) {
  const [input, setInput] = useState("");

  return (
    <Card>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Add a comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="outline outline-2  outline-offset-2"
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
