import { createContext, useState, useContext, useEffect } from "react";
import { axiosPrivate } from "../api/axios";
const PostContext = createContext();
import { useUser } from "./UserContext";

export const PostProvider = ({ children }) => {
	const [myPosts, setMyPosts] = useState([]);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useUser();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axiosPrivate.get("/post/feed");

				response.data.posts.forEach((post) => {
					if (post.image) {
						post.image =
							"http://localhost:3000/" +
							post.image
								.split("\\")
								.join("/")
								.split("public/")[1];
					}
				});

				setPosts(response.data.posts);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		
		fetchPosts();
	}, []);
	
	useEffect(() => {
		const fetchMyPosts = async () => {
			try {
				const response = await axiosPrivate.get(
					`/post/profile/${user._id}`
				);

				response.data.posts.forEach((post) => {
					if (post.image) {
						post.image =
							"http://localhost:3000/" +
							post.image
								.split("\\")
								.join("/")
								.split("public/")[1];
					}
				});
				console.log(response.data);
				setMyPosts(response.data.posts);
			} catch (error) {
				console.error(error);	
			}
		};
		if(user) {
			fetchMyPosts();
		}
	}, [user]);
	
	const getById = async (postId) => {
		try {
			const response = await axiosPrivate.get(`/post/${postId}`);
			return response.data.post;
		} catch (error) {
			console.error(error);
		}
	};

	const createPost = async (post) => {
		try {
			await axiosPrivate.post("/post", post, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
		} catch (error) {
			console.error(error);
		}
	};

	const deletePost = async (postId) => {
		try {
			await axiosPrivate.delete(`/post/${postId}`);
			setPosts((prev) => prev.filter((post) => post.id !== postId));
		} catch (error) {
			console.error(error);
		}
	};

	const updatePost = async (postId, post) => {
		try {
			const response = await axiosPrivate.put(`/post/${postId}`, post);
			setPosts((prev) =>
				prev.map((p) => (p.id === postId ? response.data.post : p))
			);
		} catch (error) {
			console.error(error);
		}
	};

	const likePost = async (postId) => {
		try {
			const response = await axiosPrivate.post(`/post/${postId}/like`);
			setPosts((prev) =>
				prev.map((p) =>
					p.id === postId
						? {
								...p,
								likes: response.data.post.likes,
								likesCount: response.data.post.likesCount,
						}
						: p
				)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const unlikePost = async (postId) => {
		try {
			const response = await axiosPrivate.post(`/post/${postId}/unlike`);
			setPosts((prev) =>
				prev.map((p) =>
					p.id === postId
						? {
								...p,
								likes: response.data.post.likes,
								likesCount: response.data.post.likesCount,
						}
						: p
				)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const commentPost = async (postId, comment) => {
		try {
			const response = await axiosPrivate.post(
				`/post/${postId}/comment`,
				comment
			);
			setPosts((prev) =>
				prev.map((p) =>
					p.id === postId
						? { ...p, comments: response.data.post.comments }
						: p
				)
			);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<PostContext.Provider
			value={{
				posts,
				myPosts,
				createPost,
				updatePost,
				deletePost,
				getById,
				likePost,
				unlikePost,
				commentPost,
				loading,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

export const usePost = () => {
	return useContext(PostContext);
};

export default PostContext;
