import { useState } from "react";

const SidebarItem = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSubMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<div onClick={toggleSubMenu} style={{ cursor: "pointer" }}>
				{title} {isOpen ? " ▲" : " ▼"}
			</div>
			{isOpen && <div>{children}</div>}
		</div>
	);
};

export default SidebarItem;
