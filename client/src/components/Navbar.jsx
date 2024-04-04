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
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import CreatePostModal from "./CreatePostModal";
import NotificationOverlay from "./NotificationOverlay";

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);

    const toggleNotificationOverlay = () => {
        setShowNotificationOverlay((prevState) => !prevState);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState);
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
            <div className="navbar flex justify-between items-center px-8 fixed top-0 left-0 w-full h-20 z-50 bg-background">
                <div className="left flex items-center space-x-2">
                    {!isSidebarOpen ? (
                        <MdMenu className="nav-icon cursor-pointer w-10 text-xl" onClick={toggleSidebar} />
                    ) : (
                        <MdClose className="nav-icon cursor-pointer w-10 text-xl" onClick={toggleSidebar} />
                    )}
                    <Link className="nav-logo-link" to="/home">
                        <h1 className="nav-logo text-2xl font-bold text-accent">OpenMedia</h1>
                    </Link>
                </div>
                <ul className="nav-links flex items-center space-x-4 text-2xl">
                    <li className="nav-link">
                        <Link to="/home">
                            <MdHome className="nav-icon" />
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/explore">
                            <MdExplore className="nav-icon" />
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/chats">
                            <MdChat className="nav-icon" />
                        </Link>
                    </li>
                    <li className="nav-link">
                        <MdAddBox className="nav-icon cursor-pointer" onClick={handleCreatePostModalOpen} />
                    </li>
                    <li className="nav-link">
                        <MdSearch className="nav-icon cursor-pointer" onClick={handleSearchModalOpen} />
                    </li>
                    <li className="nav-link">
                        <MdNotifications className="nav-icon cursor-pointer" onClick={toggleNotificationOverlay} />
                    </li>
                    <li className="nav-link">
                        <Link to="/profile">
                            <MdPerson className="nav-icon" />
                        </Link>
                    </li>
                </ul>
            </div>
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <SearchModal open={isSearchModalOpen} onClose={handleSearchModalClose} />
            <CreatePostModal open={isCreatePostModalOpen} onClose={handleCreatePostModalClose} />
            {showNotificationOverlay && (
                <NotificationOverlay onClose={toggleNotificationOverlay} />
            )}
        </>
    );
};

export default Navbar;
