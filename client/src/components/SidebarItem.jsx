import { Link } from "react-router-dom";

const SidebarItem = ({ title, url }) => {
	return (
		<div>
			<div className="sidebar-item">
				<li className="list-none">
					<Link className="block py-2 px-4 text-primary text-xl hover:bg-neutral-900 rounded-md" to={`/${url}`}>{title}</Link>
				</li>
			</div>
		</div>
	);
};

export default SidebarItem;
