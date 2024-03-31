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
// import "./styles/user-post.css";
import Comments from "./Comments";
import { axiosPrivate } from "../api/axios";
import { usePost } from "../hooks/usePost";
import { useUser } from "../hooks/useUser";

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
		<div className="post flex flex-col bg-formColor rounded-md px-4 py-5 gap-4">
			<div className="post-header flex items-center justify-between">
				<PostAuthorHeader
					authorId={postUser?._id}
					authorImage={postUser?.profilePicture}
					authorUsername={postUser?.username}
					authorName={`${postUser?.firstName} ${postUser?.lastName}`}
					className="post-author"
				/>
				<MdMoreVert className="more-action cursor-pointer text-lg" />
			</div>
			<div className="post-content space-y-4">
				<p className="post-text p-1 text-md font-light">{postData?.content}</p>
				{postData.image && (
					<div className="post-attachment">
						<img
							className="post-attachment-image w-full h-auto rounded-md object-cover"
							src={postData?.image}
							alt="Post Attachment"
						/>
					</div>
				)}
			</div>
			<div className="post-footer flex items-center justify-between p-1">
				<div className="post-actions flex gap-4 text-lg">
					{hasLiked ? (
						<MdFavorite
							className="post-like-action cursor-pointer"
							onClick={handleUnlike}
						/>
					) : (
						<MdFavoriteBorder
							className="post-like-action cursor-pointer"
							onClick={handleLike}
						/>
					)}
					<MdComment
						className="post-comment-action cursor-pointer"
						onClick={toggleComments}
					/>
					<MdRepeat className="post-repost-action" />
					<MdShare className="post-share-action" />
				</div>
				<div className="post-info text-anotherGray font-light text-sm">
					<span className="likes-count">{likesCount}</span> Likes |{" "}
					<span className="comments-count">
						{postData?.commentsCount}
					</span>{" "}
					Comments |{" "}
					<span className="shares-count">
						{postData?.repostsCount}
					</span>{" "}
					Reposts
				</div>
			</div>
			{showComments && (
				<Comments
					postId={postData._id}
					postData={postData}
				/>
			)}
		</div>
	);
};

export default UserPost;
