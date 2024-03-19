import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const RootLayout = () => {
	const location = useLocation();
	const isSetupRoute = location.pathname === "/setup";

	return (
		<div>
			{!isSetupRoute && <Navbar />}
			<Outlet />
		</div>
	);
};

export default RootLayout;
