import SidebarItem from "./SidebarItem";
import SubmenuItem from "./SubmenuItem";

const Sidebar = () => {
	return (
		<div
			style={{
				width: "200px",
				backgroundColor: "#151515",
				padding: "10px",
			}}
		>
			<SidebarItem title="Main Item">
				<SubmenuItem title="Sub Item 1" />
				<SubmenuItem title="Sub Item 2" />
				<SubmenuItem title="Sub Item 3" />
			</SidebarItem>
		</div>
	);
};

export default Sidebar;
