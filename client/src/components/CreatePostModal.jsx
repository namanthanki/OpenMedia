import { useState } from "react";
import "./styles/create-post-modal.css";
import PostAuthorHeader from "./PostAuthorHeader";

const CreatePostModal = ({ open, onClose }) => {
	const [postContent, setPostContent] = useState("");

	const handleClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setPostContent("");
		onClose();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(postContent);
		setPostContent("");
		onClose();
	};

	return (
		<div className={`modal ${open ? "active" : ""}`}>
			<div className="modal-content">
				<h2 className="create-post-header">Create Post</h2>
				<PostAuthorHeader
					authorImage={"/images/author-placeholder.png"}
					authorName={"Naman Thanki"}
					authorUsername={"naman.th"}
				/>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<textarea
							id="postContent"
							name="postContent"
							value={postContent}
							placeholder="What would you like to share?"
							onChange={(e) => setPostContent(e.target.value)}
							required
						/>
					</div>
					<button className="post-btn" type="submit">
						Post
					</button>
				</form>
				<button className="close-btn" onClick={handleClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default CreatePostModal;
