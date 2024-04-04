// import "./styles/explore.css";

import UsersGrid from "../components/UsersGrid";

const ExplorePage = () => {
	return (
		<div className="explorer-page-wrapper w-1/2 h-full flex justify-center items-center mt-24 mb-5">
			<div className="explorer-page-container">
				<UsersGrid />
			</div>
		</div>
	);
};

export default ExplorePage;
