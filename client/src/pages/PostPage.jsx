import { usePost } from "../context/PostContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PostPage = () => {
	const { getById } = usePost();
	const { postId } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		getById(postId).then((data) => {
			setPost(data);
		});
	}, [postId, getById]);

	return (
		<div className="post-page-container">
			<div className="post-page-wrapper">
				<h1 className="post-page-heading">Post Page</h1>
				<p className="post-page-content">{post.content}</p>
			</div>
		</div>
	);
};

export default PostPage;
