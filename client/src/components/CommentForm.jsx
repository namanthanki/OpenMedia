import { useState } from "react";
import { MdSend } from "react-icons/md";
import { axiosPrivate } from "../api/axios";

const CommentForm = ({ postId }) => {
	const [text, setText] = useState("");

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (text.trim() === "") return;
		try {
			const response = await axiosPrivate.post(
				`/post/${postId}/comment`,
				{ content: text }
			);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		} finally {
			setText("");
		}
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
