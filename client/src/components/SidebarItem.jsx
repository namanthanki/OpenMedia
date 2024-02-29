import { Link } from "react-router-dom";

const SidebarItem = ({ title, url }) => {
	return (
		<div>
			<div className="sidebar-item">
				<li>
					<Link to={`/${url}`}>{title}</Link>
				</li>
			</div>
		</div>
	);
};

export default SidebarItem;
