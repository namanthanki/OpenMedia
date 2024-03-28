import { MdEdit, MdShare, MdMoreVert } from "react-icons/md";
import PostsList from "../components/PostsList";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";

const ProfilePage = () => {
	const { user } = useUser();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user && loading) {
			setLoading(false);
		}
	}, [user, loading]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center gap-2 pt-32 pb-20">
			<div className="max-w-lg w-full bg-formColor rounded-lg overflow-hidden shadow-lg">
				<div className="user-cover-image h-48 overflow-hidden">
					<img src={user.coverPicture} alt="User Cover" className="w-full h-full object-cover" />
				</div>
				<div className="user-image relative w-32 h-32 rounded-full border-2 border-white overflow-hidden -mt-16 mx-auto">
					<img src={user.profilePicture} alt="User" className="w-full h-full object-cover" />
				</div>
				<div className="p-6">
					<div className="flex justify-between">
						<div className="mb-4">
							<h1 className="text-xl font-bold text-accent-color">{`${user.firstName} ${user.lastName}`}</h1>
							<p className="text-sm text-gray-400">{`@${user.username}`}</p>
						</div>
						<div className="flex justify-center items-center gap-4 mb-4">
							<MdEdit className="text-xl text-white cursor-pointer" />
							<MdShare className="text-xl text-white cursor-pointer" />
							<MdMoreVert className="text-xl text-white cursor-pointer" />
						</div>
					</div>
					<p className="text-lg text-grayLight text-center">{user.bio}</p>
					<div className="flex justify-around mt-6 border-t border-gray-800 pt-4">
						<div className="text-center">
							<h1 className="text-xl font-semibold text-accent-color">{user.posts.length}</h1>
							<p className="text-sm text-grayLight">Posts</p>
						</div>
						<div className="text-center">
							<h1 className="text-xl font-semibold text-accent-color">{user.friendsCount}</h1>
							<p className="text-sm text-grayLight">Friends</p>
						</div>
						<div className="text-center">
							<h1 className="text-xl font-semibold text-accent-color">{user.followersCount}</h1>
							<p className="text-sm text-grayLight">Followers</p>
						</div>
						<div className="text-center">
							<h1 className="text-xl font-semibold text-accent-color">{user.followingsCount}</h1>
							<p className="text-sm text-grayLight">Following</p>
						</div>
					</div>
				</div>
			</div>
			<div className="max-w-lg w-full">
				<div className="mb-4">
					<h2 className="text-3xl font-bold text-center text-accent">My Posts</h2>
				</div>
				<PostsList />
			</div>
		</div>
	);
};

export default ProfilePage;
