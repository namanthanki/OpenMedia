import SidebarItem from "./SidebarItem";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

// import "./styles/sidebar.css";


const Sidebar = ({ isSidebarOpen }) => {
	const navigate = useNavigate();
	const logout = useLogout();

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	}

	return (
		<aside className={`sidebar-container fixed top-0 ${isSidebarOpen ? "left-0" : "-left-full"} flex flex-col justify-center items-center w-1/6 h-screen p-5 z-40 bg-background transition duration-300 ease-in-out`}>
			<SidebarItem title="Home" url="home" />
			<SidebarItem title="Profile" url="profile" />
			<SidebarItem title="Chats" url="chats" />
			<SidebarItem title="Settings" url="settings" />
			<SidebarItem title="Help" url="help" />
			{/* <SidebarItem title="Logout" url="logout" /> */}
			<button className="text-white py-2 px-4 mt-4 bg-red-600 hover:bg-red-700 rounded" onClick={handleLogout}>
				Logout
			</button>
		</aside>
	);
};

export default Sidebar;
