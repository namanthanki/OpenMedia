import Comment from "./Comment";
import CommentForm from "./CommentForm";

import "./styles/comments.css";

const handleCommentSubmit = async (commentData) => {
	// Implement logic to submit new comment to the backend API
	console.log("Submitting comment:", commentData);
	try {
		// Example: Send commentData to backend API for submission
		// const response = await fetch('/api/comments', {
		//   method: 'POST',
		//   body: JSON.stringify(commentData),
		//   headers: {
		//     'Content-Type': 'application/json'
		//   }
		// });
		// if (response.ok) {
		//   // Comment submitted successfully
		//   fetchComments(); // Fetch updated comments
		// } else {
		//   console.error('Failed to submit comment');
		// }
	} catch (error) {
		console.error("Error submitting comment:", error);
	}
};

const Comments = ({ commentsListData }) => {
	return (
		<div className="comments-container">
			<h3 className="comments-title">Comments</h3>
			<CommentForm onSubmit={handleCommentSubmit} />
			<div className="comments-list">
				{commentsListData.map((commentData) => (
					<Comment commentData={commentData} key={commentData.id} />
				))}
			</div>
			<button className="view-more-comments-btn">
				View More Comments
			</button>
		</div>
	);
};

export default Comments;
