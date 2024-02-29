import {
	MdMoreVert,
	MdFavorite,
	MdComment,
	MdRepeat,
	MdShare,
} from "react-icons/md";
import PostAuthorHeader from "./PostAuthorHeader";

import "./styles/user-post.css";

const UserPost = ({ postData }) => {
	return (
		<div className="post">
			<div className="post-header">
				<PostAuthorHeader
					authorImage={postData.author.image}
					authorUsername={postData.author.username}
					authorName={postData.author.name}
					className="post-author"
				/>
				<MdMoreVert className="more-action" />
			</div>
			<div className="post-content">
				<p className="post-text">{postData.content}</p>
				{/* Todo: Make Attachment Componenet that can handle the rendering part */}
				<div className="post-attachment">
					<img
						className="post-attachment-image"
						src={postData.attachments.image}
						alt="Post Attachment"
					/>
				</div>
			</div>
			<div className="post-footer">
				<div className="post-actions">
					<MdFavorite className="post-like-action" />
					<MdComment className="post-comment-action" />
					<MdRepeat className="post-repost-action" />
					<MdShare className="post-share-action" />
				</div>
				<div className="post-info">
					<span className="likes-count">
						{postData.statistics.likes}
					</span>{" "}
					Likes |{" "}
					<span className="comments-count">
						{postData.statistics.comments}
					</span>{" "}
					Comments |{" "}
					<span className="shares-count">
						{postData.statistics.shares}
					</span>{" "}
					Shares
				</div>
			</div>
		</div>
	);
};

export default UserPost;
