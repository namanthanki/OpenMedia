import { MdEdit, MdShare, MdMoreVert } from "react-icons/md";
import "./styles/profile.css";
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
		<div className="profile-wrapper">
			<div className="profile-container">
				<div className="user-info-container">
					<div className="user-cover-image">
						<img src={user.coverPicture} alt="User Cover" />
					</div>
					<div className="user-image">
						<img src={user.profilePicture} alt="User" />
					</div>
					<div className="user-details">
						<div>
							<div className="header-row">
								<div>
									<h1 className="user-name">{`${user.firstName} ${user.lastName}`}</h1>
									<p className="user-username">{`@${user.username}`}</p>
								</div>
								<div className="profile-actions">
									<MdEdit className="edit-action" />
									<MdShare className="share-action" />
									<MdMoreVert className="more-action" />
								</div>
							</div>
							<p className="user-bio">
								{/* Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. */}
								{user.bio}
							</p>
						</div>
					</div>
					<div className="user-statistics">
						<div className="user-stat">
							<h1 className="stat-count">{user.posts.length}</h1>
							<p className="stat-label">Posts</p>
						</div>
						<div className="user-stat">
							<h1 className="stat-count">{user.friendsCount}</h1>
							<p className="stat-label">Friends</p>
						</div>
						<div className="user-stat">
							<h1 className="stat-count">{user.followersCount}</h1>
							<p className="stat-label">Followers</p>
						</div>
						<div className="user-stat">
							<h1 className="stat-count">{user.followingsCount}</h1>
							<p className="stat-label">Following</p>
						</div>
					</div>
				</div>
			</div>
			<div className="user-profile-posts">
				<div className="posts-list-title">
					<h2>My Posts</h2>
				</div>
				<PostsList />
			</div>
		</div>
	);
};

export default ProfilePage;
