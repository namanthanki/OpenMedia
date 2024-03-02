import Comment from "../components/Comment";
import { useLocation } from "react-router-dom";

import "./styles/all-comments.css";

const AllCommentsPage = () => {
	const comments = useLocation().state;
    console.log(comments);
	return (
		<div className="all-comments-page">
			<h2>All Comments</h2>
			<div className="comments">
				{comments.map((comment) => (
					<Comment key={comment.id} commentData={comment} />
				))}
			</div>
		</div>
	);
};

export default AllCommentsPage;
