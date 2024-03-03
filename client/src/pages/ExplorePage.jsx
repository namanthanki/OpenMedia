import TrendingPosts from "../components/TrendingPosts";
import PopularTopics from "../components/PopularTopics";
import RecommendedUsers from "../components/RecommendedUsers";

import "./styles/explore.css";

const ExplorePage = () => {
	return (
		<div className="explore-page">
			<h2>Explore</h2>
			<div className="explore-content">
				<TrendingPosts />
				<PopularTopics />
				<RecommendedUsers />
				{/* Add more sections or components as needed */}
			</div>
		</div>
	);
};

export default ExplorePage;
