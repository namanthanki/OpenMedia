// import "./styles/post-author-header.css";
import { useNavigate } from "react-router-dom";

const PostAuthorHeader = ({ authorId, authorImage, authorName, authorUsername }) => {
	const navigate = useNavigate();
	return (
		<div className="post-author-header flex items-center gap-2">
			<img
				onClick={() => { navigate(`/profile/${authorId}`); }}
				className="author-profile-img w-10 h-10 rounded-full object-cover cursor-pointer"
				src={authorImage}
				alt={`${authorUsername}'s Image`}
			/>
			<div className="author-info">
				<h2 className="author-name m-0 text-sm text-primary">{authorName}</h2>
				<p className="author-username m-0 text-sm font-thin text-primary">@{authorUsername}</p>
			</div>
		</div>
	);
};

export default PostAuthorHeader;
