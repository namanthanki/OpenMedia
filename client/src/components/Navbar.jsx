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
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
	const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

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
	}

	const handleCreatePostModalClose = () => {
		setIsCreatePostModalOpen(false);
	}

	return (
		<>
			<div className="navbar">
				<div className="left">
					<div className="sidebar-btn" onClick={toggleSidebar}>
						{!isSidebarOpen ? <MdMenu /> : <MdClose />}
					</div>
					<h1 className="nav-logo">OpenMedia</h1>
				</div>
				<ul className="nav-links">
					<li className="nav-link">
						<Link to="/">
							<MdHome />
						</Link>
					</li>
					<li className="nav-link">
						<Link to="#">
							<MdExplore />
						</Link>
					</li>
					<li className="nav-link">
						<Link to="/chats">
							<MdChat />
						</Link>
					</li>
					<li className="nav-link">
						<Link tp="#">
							<MdAddBox onClick={handleCreatePostModalOpen} />
						</Link>
					</li>
					<li className="nav-link">
						<Link to="#">
							<MdSearch onClick={handleSearchModalOpen} />
						</Link>
					</li>
					<li className="nav-link">
						<Link to="#">
							<MdNotifications />
						</Link>
					</li>
					<li className="nav-link">
						<Link to="/profile">
							<MdPerson />
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
		</>
	);
};

export default Navbar;
