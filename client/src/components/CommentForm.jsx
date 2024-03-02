import { useState } from "react";
import { MdSend } from "react-icons/md";

const CommentForm = ({ onSubmit }) => {
	const [text, setText] = useState("");

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim() === "") return;
		onSubmit(text);
		setText("");
	};

	return (
		<form onSubmit={handleSubmit} className="comment-form">
			<textarea
				className="comment-input"
				value={text}
				onChange={handleChange}
				placeholder="Write a comment..."
				required
			></textarea>
			<MdSend
				type="submit"
				className="comment-submit"
				onClick={handleSubmit}
			/>
		</form>
	);
};

export default CommentForm;
