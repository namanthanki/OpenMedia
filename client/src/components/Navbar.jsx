import { useState } from "react";
import {
	MdExplore,
	MdAddBox,
	MdHome,
	MdChat,
	MdSearch,
	MdPerson,
	MdMenu,
	MdNotifications,
	MdClose,
} from "react-icons/md";

import "./styles/navbar.css";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import CreatePostModal from "./CreatePostModal";
import NotificationOverlay from "./NotificationOverlay";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
	const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
	const [showNotificationOverlay, setShowNotificationOverlay] =
		useState(false);

	const toggleNotificationOverlay = () => {
		setShowNotificationOverlay((prevState) => !prevState);
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleSearchModalOpen = () => {
		setIsSearchModalOpen(true);
	};

	const handleSearchModalClose = () => {
		setIsSearchModalOpen(false);
	};

	const handleCreatePostModalOpen = () => {
		setIsCreatePostModalOpen(true);
	};

	const handleCreatePostModalClose = () => {
		setIsCreatePostModalOpen(false);
	};

	return (
		<>
			<div className="navbar">
				<div className="left">
					<div className="sidebar-btn" onClick={toggleSidebar}>
						{!isSidebarOpen ? (
							<MdMenu className="nav-icon" />
						) : (
							<MdClose className="nav-icon" />
						)}
					</div>
					<Link className="nav-logo-link" to="/">
						<h1 className="nav-logo">OpenMedia</h1>
					</Link>
				</div>
				<ul className="nav-links">
					<li className="nav-link">
						<Link to="/">
							<MdHome className="nav-icon" />
						</Link>
					</li>
					<li className="nav-link">
						<Link to="#">
							<MdExplore className="nav-icon" />
						</Link>
					</li>
					<li className="nav-link">
						<Link to="/chats">
							<MdChat className="nav-icon" />
						</Link>
					</li>
					<li className="nav-link">
						{/* <Link to="#"> */}
						<MdAddBox
							className="nav-icon"
							onClick={handleCreatePostModalOpen}
						/>
						{/* </Link> */}
					</li>
					<li className="nav-link">
						{/* <Link to="#"> */}
						<MdSearch
							className="nav-icon"
							onClick={handleSearchModalOpen}
						/>
						{/* </Link> */}
					</li>
					<li className="nav-link">
						{/* <Link to="#"> */}
						<MdNotifications
							className="nav-icon"
							onClick={toggleNotificationOverlay}
						/>
						{/* </Link> */}
					</li>
					<li className="nav-link">
						<Link to="/profile">
							<MdPerson className="nav-icon" />
						</Link>
					</li>
				</ul>
			</div>
			<Sidebar isSidebarOpen={isSidebarOpen} />
			<SearchModal
				open={isSearchModalOpen}
				onClose={handleSearchModalClose}
			/>
			<CreatePostModal
				open={isCreatePostModalOpen}
				onClose={handleCreatePostModalClose}
			/>
			{showNotificationOverlay && (
				<NotificationOverlay onClose={toggleNotificationOverlay} />
			)}
		</>
	);
};

export default Navbar;
