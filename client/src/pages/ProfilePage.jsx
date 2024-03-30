import {
    MdEdit,
    MdShare,
    MdMoreVert,
    MdPersonAdd,
    MdPersonRemove,
} from "react-icons/md";
import PostsList from "../components/PostsList";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";

const ProfilePage = () => {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    const [otherUser, setOtherUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOtherUser = async () => {
            await axiosPrivate
                .get(`/user/${userId}`)
                .then((res) => {
                    const fetchedUser = res.data.user;
                    fetchedUser.profilePicture = `http://localhost:3000/${
                        fetchedUser.profilePicture
                            .split("\\")
                            .join("/")
                            .split("public/")[1]
                    }`;
                    fetchedUser.coverPicture = `http://localhost:3000/${
                        fetchedUser.coverPicture
                            .split("\\")
                            .join("/")
                            .split("public/")[1]
                    }`;
                    setLoading(false);
                    setOtherUser(fetchedUser);
                })
                .catch((err) => console.log(err));
        };

        if (userId) {
            if (userId === user?._id) {
                navigate("/profile", { replace: true });
            } else {
                try {
                    setLoading(true);
                    fetchOtherUser();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }, [userId]);

    useEffect(() => {
        if ((user || otherUser) && loading) {
            setLoading(false);
        }
    }, [user, otherUser, loading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleFollow = async () => {
        await axiosPrivate
            .post(`/user/follow/${userId}`)
            .then((res) => {
                res.data.user.user.profilePicture = `http://localhost:3000/${
                    res.data.user.user.profilePicture
                        .split("\\")
                        .join("/")
                        .split("public/")[1]
                }`;
                res.data.user.user.coverPicture = `http://localhost:3000/${
                    res.data.user.user.coverPicture
                        .split("\\")
                        .join("/")
                        .split("public/")[1]
                }`;
                res.data.user.followUser.profilePicture = `http://localhost:3000/${
                    res.data.user.followUser.profilePicture
                        .split("\\")
                        .join("/")
                        .split("public/")[1]
                }`;
                res.data.user.followUser.coverPicture = `http://localhost:3000/${
                    res.data.user.followUser.coverPicture
                        .split("\\")
                        .join("/")
                        .split("public/")[1]
                }`;
                setUser((user) => ({ ...user, ...res.data.user.user }));
                setOtherUser((otherUser) => ({
                    ...otherUser,
                    ...res.data.user.followUser,
                }));
            })
            .catch((err) => console.log(err));
    };

    const handleUnfollow = async () => {
        await axiosPrivate
            .post(`/user/unfollow/${userId}`)
            .then((res) => {
                res.data.user.user.profilePicture = `http://localhost:3000/${
                    res.data.user.user.profilePicture
                        .split("\\")
                        .join("/")
                        .split("public/")[1]
                }`;
                res.data.user.user.coverPicture = `http://localhost:3000/${
                    res.data.user.user.coverPicture
                        .split("\\")
                        .join("/")
                        .split("public/")[1]
                }`;
                res.data.user.unfollowUser.profilePicture = `http://localhost:3000/${
                    res.data.user.unfollowUser.profilePicture
                        .split("\\")
                        .join("/")
                        .split("public/")[1]
                }`;
                res.data.user.unfollowUser.coverPicture = `http://localhost:3000/${
                    res.data.user.unfollowUser.coverPicture
                        .split("\\")
                        .join("/")
                        .split("public/")[1]
                }`;
                setUser((user) => ({ ...user, ...res.data.user.user }));
                setOtherUser((otherUser) => ({
                    ...otherUser,
                    ...res.data.user.unfollowUser,
                }));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="flex flex-col items-center justify-center gap-2 pt-32 pb-20">
            <div className="max-w-lg w-full bg-formColor rounded-lg overflow-hidden shadow-lg">
                <div className="user-cover-image h-48 overflow-hidden">
                    <img
                        src={
                            otherUser
                                ? otherUser.coverPicture
                                : user.coverPicture
                        }
                        alt="User Cover"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="user-image relative w-32 h-32 rounded-full border-2 border-white overflow-hidden -mt-16 mx-auto">
                    <img
                        src={
                            otherUser
                                ? otherUser.profilePicture
                                : user.profilePicture
                        }
                        alt="User"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="flex justify-between">
                        <div className="mb-4">
                            <h1 className="text-xl font-bold text-accent-color">
                                {otherUser
                                    ? `${otherUser.firstName} ${otherUser.lastName}`
                                    : `${user.firstName} ${user.lastName}`}
                            </h1>
                            <p className="text-sm text-gray-400">
                                {otherUser
                                    ? `@${otherUser.username}`
                                    : `@${user.username}`}
                            </p>
                        </div>
                        <div className="flex justify-center items-center gap-4 mb-4">
                            {otherUser ? (
                                <>
                                    {user.followings.includes(otherUser._id) ? (
                                        <button
                                            onClick={handleUnfollow}
                                            className="bg-anotherBlack text-white px-4 py-1 rounded-full text-sm"
                                        >
                                            Following
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleFollow}
                                            className="bg-accent text-white px-4 py-1 rounded-full text-sm"
                                        >
                                            Follow
                                        </button>
                                    )}

                                    {user.friends.includes(otherUser._id) ? (
                                        <MdPersonRemove className="text-xl text-white cursor-pointer" />
                                    ) : (
                                        <MdPersonAdd className="text-xl text-white cursor-pointer" />
                                    )}
                                    <MdShare className="text-xl text-white cursor-pointer" />
                                </>
                            ) : (
                                <>
                                    <MdEdit className="text-xl text-white cursor-pointer" />
                                    <MdShare className="text-xl text-white cursor-pointer" />
                                    <MdMoreVert className="text-xl text-white cursor-pointer" />
                                </>
                            )}
                        </div>
                    </div>
                    <p className="text-lg text-grayLight text-center">
                        {otherUser ? otherUser.bio : user.bio}
                    </p>
                    <div className="flex justify-around mt-6 border-t border-gray-800 pt-4">
                        <div className="text-center">
                            <h1 className="text-xl font-semibold text-accent-color">
                                {otherUser
                                    ? otherUser.posts.length
                                    : user.posts.length}
                            </h1>
                            <p className="text-sm text-grayLight">Posts</p>
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl font-semibold text-accent-color">
                                {otherUser
                                    ? otherUser.friendsCount
                                    : user.friendsCount}
                            </h1>
                            <p className="text-sm text-grayLight">Friends</p>
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl font-semibold text-accent-color">
                                {otherUser
                                    ? otherUser.followersCount
                                    : user.followersCount}
                            </h1>
                            <p className="text-sm text-grayLight">Followers</p>
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl font-semibold text-accent-color">
                                {otherUser
                                    ? otherUser.followingsCount
                                    : user.followingsCount}
                            </h1>
                            <p className="text-sm text-grayLight">Followings</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-lg w-full">
                <div className="mb-4">
                    <h2 className="text-3xl font-bold text-center text-accent">
                        {otherUser
                            ? `${otherUser.firstName}'s Posts`
                            : "My Posts"}
                    </h2>
                </div>
                <PostsList userId={userId} />
            </div>
        </div>
    );
};

export default ProfilePage;
