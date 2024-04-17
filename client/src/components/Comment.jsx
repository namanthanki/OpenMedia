const Comment = ({ commentData }) => {
	return (
		<div className="comment-container flex w-full gap-4">
			<img
				className="comment-author-image w-10 h-10 rounded-full object-cover m-0 p-0"
				src={commentData.authorProfilePicture}
				alt={`${commentData.authorUsername}'s Image`}
			/>
			<div className="comment-content w-full flex flex-col">
				<div className="comment-header w-full flex items-center justify-between">
					<h4 className="comment-author text-md font-normal">{commentData.authorUsername}</h4>
					<p className="comment-date font-thin text-xs">
						{new Date(commentData.createdAt).toDateString()}
					</p>
				</div>
				<p className="comment-text text-sm font-light">{commentData.content}</p>
			</div>
		</div>
	);
};

export default Comment;
