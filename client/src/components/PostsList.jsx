import { useEffect, useState } from "react";
import UserPost from "./UserPost";
import { usePost } from "../hooks/usePost";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";

const PostsList = ({ userId }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const { posts, myPosts } = usePost();
    const [loading, setLoading] = useState(true);
    const [otherUserPosts, setOtherUserPosts] = useState([]);

    useEffect(() => {
        const fetchOtherUserPosts = async () => {
            await axiosPrivate
                .get(`/post/profile/${userId}`)
                .then((res) => {
                    res.data.posts.forEach((post) => {
                        if (post.image) {
                            post.image =
                                "http://localhost:3000/" +
                                post.image
                                    .split("\\")
                                    .join("/")
                                    .split("public/")[1];
                        }
                    });
                    setOtherUserPosts(res.data.posts);
                })
                .catch((err) => {
                    navigate("/profile");
                });
        };

        if (userId) {
            try {
                setLoading(true);
                fetchOtherUserPosts();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    }, [userId]);

    useEffect(() => {
        if ((posts || myPosts) && loading) {
            setLoading(false);
        }
    }, [posts, myPosts, loading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="posts-container flex flex-col gap-4">
            {currentPath === "/profile" || currentPath === "/profile/" ? (
                myPosts.length > 0 ? (
                    myPosts.map((postData) => (
                        <UserPost postData={postData} key={postData._id} />
                    ))
                ) : (
                    <div className="no-posts-message">
                        <p>No posts by you!</p>
                        <p>Start Sharing Your Thoughts</p>
                    </div>
                )
            ) : currentPath === "/home" || currentPath === "/home/" ? (
                posts.length > 0 ? (
                    posts.map((postData) => (
                        <UserPost postData={postData} key={postData._id} />
                    ))
                ) : (
                    <div className="no-posts-message">
                        <p>No Posts Found For You!</p>
                        <p>Follow Someone to See Their Posts</p>
                    </div>
                )
            ) : currentPath === `/profile/${userId}` ||
              currentPath === `/profile/${userId}/` ? (
                otherUserPosts.length > 0 ? (
                    otherUserPosts.map((postData) => (
                        <UserPost postData={postData} key={postData._id} />
                    ))
                ) : (
                    <div className="no-posts-message text-center">
                        <p>No Posts Found For This User!</p>
                    </div>
                )
            ) : (
                <div className="no-posts-message">
                    <p>404 Not Found!</p>
                </div>
            )}
        </div>
    );
};

export default PostsList;
