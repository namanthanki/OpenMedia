import { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

// import "./styles/comments.css";
import { axiosPrivate } from "../api/axios";

const Comments = ({ postId, postData }) => {
	const [commentsData, setCommentsData] = useState([]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await axiosPrivate.get(
					`/post/${postId}/comments`
				);
				console.log(response.data.comments);
				response.data.comments.map((comment) => {
					comment.authorProfilePicture = `http://localhost:3000/${
						comment.authorProfilePicture
							.split("\\")
							.join("/")
							.split("public/")[1]
					}`;
					return comment;
				});
				setCommentsData(response.data.comments);
			} catch (error) {
				console.error(error);
			}
		};

		fetchComments();
	}, [postId]);

	return (
		<div className="comments-container flex flex-col w-full gap-2">
			<h3 className="comments-title">Comments</h3>
			<CommentForm postId={postId} postData={postData} setComments={setCommentsData} />
			<div className="comments-list flex flex-col gap-2 my-1 w-full">
				{commentsData.map((commentData) => (
					<Comment commentData={commentData} key={commentData._id} />
				))}
			</div>
		</div>
	);
};

export default Comments;
