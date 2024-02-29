import "./styles/post-author-header.css";

const PostAuthorHeader = ({ authorImage, authorName, authorUsername }) => {
	return (
		<div className="post-author-header">
			<img
				className="author-profile-img"
				src={authorImage}
				alt={`${authorUsername}'s Image`}
			/>
			<div className="author-info">
				<h2 className="author-name">{authorName}</h2>
				<p className="author-username">@{authorUsername}</p>
			</div>
		</div>
	);
};

export default PostAuthorHeader;
