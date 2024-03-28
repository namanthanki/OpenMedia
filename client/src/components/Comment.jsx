const Comment = ({ commentData }) => {
	return (
		<div className="comment-container">
			<img
				className="comment-author-image m-0 p-0"
				src={commentData.authorProfilePicture}
				alt={`${commentData.authorUsername}'s Image`}
			/>
			<div className="comment-content w-full flex flex-col">
				<div className="comment-header">
					<h4 className="comment-author">{commentData.authorUsername}</h4>
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
