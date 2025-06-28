import React, { useState } from "react";

export default function CommentSection({
  placeholder = "Add a comment",
  comments = [],
  onSubmit = () => {},
}) {
  const [inputValue, setInputValue] = useState("");

  const handleCommentSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <>
      <div className="mb-3">
        <input
          className="form-control form-control-sm"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="text-end mb-3">
        <button className="btn comment-btn" onClick={handleCommentSubmit}>
          Comment
        </button>
      </div>

      <div className="small comments-list">
        {comments.map((comment, idx) => (
          <p key={idx}>
            <strong>{comment.author?.username || comment.user}</strong>:{" "}
            {comment.content || comment.text}
          </p>
        ))}
      </div>
    </>
  );
}
