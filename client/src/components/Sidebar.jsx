import SidebarItem from "./SidebarItem";
import "./styles/sidebar.css";

const Sidebar = ({ isSidebarOpen }) => {
	return (
		<aside className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
			<SidebarItem title="Home" url="" />
			<SidebarItem title="Profile" url="profile" />
			<SidebarItem title="Chats" url="chats" />
			<SidebarItem title="Settings" url="settings" />
			<SidebarItem title="Help" url="help" />
			<SidebarItem title="Logout" url="logout" />
		</aside>
	);
};

export default Sidebar;
