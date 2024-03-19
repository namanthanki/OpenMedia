import CreatePost from "../components/CreatePost";
import PostsList from "../components/PostsList";
import { useUser } from "../context/UserContext";

import "./styles/home.css";

const HomePage = () => {
	const { user } = useUser();

	return (
		<div className="home-container">
			<CreatePost
				authorImage={user?.profilePicture}
				authorUsername={user?.username}
			/>
			<PostsList />
		</div>
	);
};

export default HomePage;
