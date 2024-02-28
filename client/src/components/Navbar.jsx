import "./styles/navbar.css";
import { MdExplore, MdAddBox, MdHome, MdChat, MdSearch, MdPerson, MdMenu, MdNotifications } from "react-icons/md";

const Navbar = () => {
	return (
		<div className="navbar">
            <h1 className="nav-logo">OpenMedia</h1>
			<ul className="nav-links">
				<li className="nav-link"><a href="#"><MdHome /></a></li>
				<li className="nav-link"><a href="#"><MdExplore /></a></li>
				<li className="nav-link"><a href="#"><MdChat /></a></li>
				<li className="nav-link"><a href="#"><MdAddBox /></a></li>
				<li className="nav-link"><a href="#"><MdSearch /></a></li>
				<li className="nav-link"><a href="#"><MdNotifications /></a></li>
				<li className="nav-link"><a href="#"><MdPerson /></a></li>
			</ul>
			<div className="sidebar-toggle">
                <MdMenu />
            </div>
		</div>
	);
};

export default Navbar;
