import UserPost from "./UserPost";
import { usePost } from "../context/PostContext";

import "./styles/posts.css";

const PostsList = () => {
	const { posts } = usePost();

	return (
		<div className="posts-container">
			{posts.length > 0 ? (
				posts.map((postData) => (
					<UserPost postData={postData} key={postData._id} />
				))
			) : (
				<div className="no-posts-message">
					<p>No Posts Found For You!</p>
					<p>Follow Someone to See Their Posts</p>
				</div>
			)}
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
		comments: [
			{
				id: 1,
				userImage: "/images/author-placeholder.png",
				username: "rajesh.th",
				content: "This is a comment",
				createdAt: "2021-09-01T12:00:00Z",
			},
			{
				id: 2,
				userImage: "/images/author-placeholder.png",
				username: "bharti.th",
				content: "This is a comment",
				createdAt: "2021-09-01T12:00:00Z",
				replies: [
					{
						id: 1,
						userImage: "/images/author-placeholder.png",
						username: "rajesh.th",
						content: "This is a reply",
						createdAt: "2021-09-01T12:00:00Z",
					},
					{
						id: 2,
						userImage: "/images/author-placeholder.png",
						username: "rajesh.th",
						content: "This is a reply",
						createdAt: "2021-09-01T12:00:00Z",
					},
				],
			},
		],
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
		comments: [
			{
				id: 1,
				userImage: "/images/author-placeholder.png",
				username: "naman.th",
				content: "This is a comment",
				createdAt: "2021-09-01T12:00:00Z",
				replies: [
					{
						id: 1,
						userImage: "/images/author-placeholder.png",
						username: "rajesh.th",
						content: "This is a reply",
						createdAt: "2021-09-01T12:00:00Z",
					},
					{
						id: 2,
						userImage: "/images/author-placeholder.png",
						username: "rajesh.th",
						content: "This is a reply",
						createdAt: "2021-09-01T12:00:00Z",
						replies: [
							{
								id: 1,
								userImage: "/images/author-placeholder.png",
								username: "naman.th",
								content: "This is a reply",
								createdAt: "2021-09-01T12:00:00Z",
							},
							{
								id: 2,
								userImage: "/images/author-placeholder.png",
								username: "naman.th",
								content: "This is a reply",
								createdAt: "2021-09-01T12:00:00Z",
							},
						],
					},
				],
			},
			{
				id: 2,
				userImage: "/images/author-placeholder.png",
				username: "bharti.th",
				content: "This is a comment",
				createdAt: "2021-09-01T12:00:00Z",
			},
		],
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
		comments: [
			{
				id: 1,
				userImage: "/images/author-placeholder.png",
				username: "naman.th",
				content: "This is a comment",
				createdAt: "2021-09-01T12:00:00Z",
				replies: [
					{
						id: 1,
						userImage: "/images/author-placeholder.png",
						username: "rajesh.th",
						content: "This is a reply",
						createdAt: "2021-09-01T12:00:00Z",
					},
					{
						id: 2,
						userImage: "/images/author-placeholder.png",
						username: "rajesh.th",
						content: "This is a reply",
						createdAt: "2021-09-01T12:00:00Z",
					},
				],
			},
			{
				id: 2,
				userImage: "/images/author-placeholder.png",
				username: "rajesh.th",
				content: "This is a comment",
				createdAt: "2021-09-01T12:00:00Z",
			},
		],
	},
];
