import SidebarItem from "./SidebarItem";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

import "./styles/sidebar.css";


const Sidebar = ({ isSidebarOpen }) => {
	const navigate = useNavigate();
	const logout = useLogout();

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	}

	return (
		<aside className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
			<SidebarItem title="Home" url="" />
			<SidebarItem title="Profile" url="profile" />
			<SidebarItem title="Chats" url="chats" />
			<SidebarItem title="Settings" url="settings" />
			<SidebarItem title="Help" url="help" />
			{/* <SidebarItem title="Logout" url="logout" /> */}
			<button onClick={handleLogout}>
				Logout
			</button>
		</aside>
	);
};

export default Sidebar;
