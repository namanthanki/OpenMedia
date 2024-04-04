import { createContext, useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useUser } from "../hooks/useUser";
import { toast } from "react-hot-toast";

const PostContext = createContext();

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
            } catch (error) {
                console.error(error);
                toast.error("Error fetching posts");
            } finally {
                setLoading(false);
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
                toast.error("Error fetching posts");
            } finally {
                setLoading(false);
            }
        };
        if (user) {
            fetchMyPosts();
        }
    }, [user]);

    const getById = async (postId) => {
        try {
            const response = await axiosPrivate.get(`/post/${postId}`);
            return response.data.post;
        } catch (error) {
            console.error(error);
            toast.error("Error fetching post");
        }
    };

    const createPost = async (post) => {
        try {
            await axiosPrivate
                .post("/post", post, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    if (response.status === 201) {
                        toast("Post created successfully", {
                            icon: "🤩",
                        });
                    } else {
                        toast.error("Error creating post");
                    }
                });
        } catch (error) {
            console.error(error);
            toast.error("Error creating post");
        }
    };

    const deletePost = async (postId) => {
        try {
            await axiosPrivate.delete(`/post/${postId}`).then((response) => {
                if (response.status === 200) {
                    toast("Post deleted successfully", {
                        icon: "🥱",
                    });
                } else {
                    toast.error("Error deleting post");
                }
            });
            setPosts((prev) => prev.filter((post) => post.id !== postId));
        } catch (error) {
            console.error(error);
            toast.error("Error deleting post");
        }
    };

    const updatePost = async (postId, post) => {
        try {
            const response = await axiosPrivate.put(`/post/${postId}`, post);
            if (response.status === 200) {
                toast("Post updated successfully", {
                    icon: "🫡",
                });
            } else {
                toast.error("Error updating post");
            }
            setPosts((prev) =>
                prev.map((p) => (p.id === postId ? response.data.post : p))
            );
        } catch (error) {
            console.error(error);
            toast.error("Error updating post");
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
			
            if (response.status === 200) {
                toast("Comment added successfully", {
                    icon: "👌",
                });
            } else {
				toast.error("Error adding comment");
			}

            setPosts((prev) =>
                prev.map((p) =>
                    p.id === postId
                        ? { ...p, comments: response.data.post.comments }
                        : p
                )
            );
        } catch (error) {
            console.error(error);
			toast.error("Error adding comment");
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

export default PostContext;
