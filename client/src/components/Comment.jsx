import { useState } from "react";

const Comment = ({ commentData }) => {
	const [showReplies, setShowReplies] = useState(false);

	const toggleReplies = () => {
		console.log(commentData.replies);
		setShowReplies((prevState) => !prevState);
	};

	return (
		<div className="comment-container">
			<img
				className="comment-author-image"
				src={commentData.userImage}
				alt={`${commentData.username}'s Image`}
			/>
			<div className="comment-content">
				<div className="comment-header">
					<h4 className="comment-author">{commentData.username}</h4>
					<p className="comment-date">
						{new Date(commentData.createdAt).toDateString()}
					</p>
				</div>
				<p className="comment-text">{commentData.content}</p>
				<div className="comment-actions">
					{commentData.replies && (
						<button onClick={toggleReplies}>
							{showReplies ? "Hide" : "Show"} Replies
						</button>
					)}
					<button>Reply</button>
				</div>
				{showReplies && (
					<div className="replies-container">
						{commentData.replies.map((reply) => (
							<Comment key={reply.id} commentData={reply} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Comment;
