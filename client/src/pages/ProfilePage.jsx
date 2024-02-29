import { MdEdit, MdShare, MdMoreVert } from "react-icons/md";

import "./styles/profile.css";
import PostsList from "../components/PostsList";

const ProfilePage = () => {
	return (
		<div className="profile-wrapper">
			<div className="profile-container">
				<div className="user-info-container">
					<div className="user-cover-image">
						<img
							src="/images/cover-placeholder.png"
							alt="User Cover"
						/>
					</div>
					<div className="user-image">
						<img src="/images/author-placeholder.png" alt="User" />
					</div>
					<div className="user-details">
						<div>
							<div className="header-row">
								<div>
									<h1 className="user-name">Naman Thanki</h1>
									<p className="user-username">@naman.th</p>
								</div>
								<div className="profile-actions">
									<MdEdit className="edit-action" />
									<MdShare className="share-action" />
									<MdMoreVert className="more-action" />
								</div>
							</div>
							<p className="user-bio">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua.
							</p>
						</div>
					</div>
					<div className="user-statistics">
						<div className="user-stat">
							<h1 className="stat-count">10</h1>
							<p className="stat-label">Posts</p>
						</div>
						<div className="user-stat">
							<h1 className="stat-count">15</h1>
							<p className="stat-label">Friends</p>
						</div>
						<div className="user-stat">
							<h1 className="stat-count">100</h1>
							<p className="stat-label">Followers</p>
						</div>
						<div className="user-stat">
							<h1 className="stat-count">50</h1>
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
