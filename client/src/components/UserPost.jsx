import {
	MdMoreVert,
	MdFavorite,
	MdComment,
	MdRepeat,
	MdShare,
	MdFavoriteBorder,
} from "react-icons/md";
import PostAuthorHeader from "./PostAuthorHeader";
import { useEffect, useState } from "react";
import "./styles/user-post.css";
import Comments from "./Comments";
import { axiosPrivate } from "../api/axios";
import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";

const UserPost = ({ postData }) => {
	const [showComments, setShowComments] = useState(false);
	const [postUser, setPostUser] = useState(null);
	const { likePost, unlikePost } = usePost();
	const { user } = useUser();

	const [hasLiked, setHasLiked] = useState(
		postData?.likes?.includes(user._id)
	);

	const [likesCount, setLikesCount] = useState(postData?.likesCount);

	useEffect(() => {
		const fetchPostUser = async () => {
			try {
				const response = await axiosPrivate.get(
					`user/${postData.author}`
				);

				response.data.user.profilePicture =
					"http://localhost:3000/" +
					response.data.user.profilePicture
						.split("\\")
						.join("/")
						.split("public/")[1];
				setPostUser(response.data.user);
			} catch (error) {
				console.error(error);
			}
		};

		fetchPostUser();
	}, [postData.author.id]);

	const toggleComments = () => {
		setShowComments((prevState) => !prevState);
	};

	const handleLike = async () => {
		await likePost(postData._id);
		setHasLiked(true);
		setLikesCount((prev) => prev + 1);
	};

	const handleUnlike = async () => {
		await unlikePost(postData._id);
		setHasLiked(false);
		setLikesCount((prev) => prev - 1);
	};

	return (
		<div className="post">
			<div className="post-header">
				<PostAuthorHeader
					authorImage={postUser?.profilePicture}
					authorUsername={postUser?.username}
					authorName={`${postUser?.firstName} ${postUser?.lastName}`}
					className="post-author"
				/>
				<MdMoreVert className="more-action" />
			</div>
			<div className="post-content">
				<p className="post-text">{postData?.content}</p>
				{postData.image && (
					<div className="post-attachment">
						<img
							className="post-attachment-image"
							src={postData?.image}
							alt="Post Attachment"
						/>
					</div>
				)}
			</div>
			<div className="post-footer">
				<div className="post-actions">
					{hasLiked ? (
						<MdFavorite
							className="post-like-action"
							onClick={handleUnlike}
						/>
					) : (
						<MdFavoriteBorder
							className="post-like-action"
							onClick={handleLike}
						/>
					)}
					<MdComment
						className="post-comment-action"
						onClick={toggleComments}
					/>
					<MdRepeat className="post-repost-action" />
					<MdShare className="post-share-action" />
				</div>
				<div className="post-info">
					<span className="likes-count">{likesCount}</span> Likes |{" "}
					<span className="comments-count">
						{postData?.commentsCount}
					</span>{" "}
					Comments |{" "}
					<span className="shares-count">
						{postData?.repostsCount}
					</span>{" "}
					Shares
				</div>
			</div>
			{showComments && (
				<Comments
					postId={postData._id}
				/>
			)}
		</div>
	);
};

export default UserPost;
