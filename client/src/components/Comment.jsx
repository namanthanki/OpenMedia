const Comment = ({ commentData }) => {
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
			</div>
		</div>
	);
};

export default Comment;
