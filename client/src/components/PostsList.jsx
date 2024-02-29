import UserPost from "./UserPost";

import "./styles/posts.css";

const PostsList = () => {
	return (
		<div className="posts-container">
			{postsListData.map((postData) => (
				<UserPost postData={postData} key={postData.id} />
			))}
		</div>
	);
};

export default PostsList;

const postsListData = [
	{
		id: 1,
		author: {
			id: 1,
			name: "Naman Thanki",
			username: "naman.th",
			image: "/images/author-placeholder.png",
		},
		content: "This is a post content",
		attachments: {
			image: "/images/post-placeholder.png",
		},
		statistics: {
			likes: 10,
			comments: 5,
			shares: 2,
		},
	},

	{
		id: 2,
		author: {
			id: 1,
			name: "Rajesh Thanki",
			username: "rajesh.th",
			image: "/images/author-placeholder.png",
		},
		content: "This is a post content",
		attachments: {
			image: "/images/post-placeholder.png",
		},
		statistics: {
			likes: 10,
			comments: 5,
			shares: 2,
		},
	},

	{
		id: 3,
		author: {
			id: 3,
			name: "Bharti Thanki",
			username: "bharti.th",
			image: "/images/author-placeholder.png",
		},
		content: "This is a post content",
		attachments: {
			image: "/images/post-placeholder.png",
		},
		statistics: {
			likes: 10,
			comments: 5,
			shares: 2,
		},
	},
];
