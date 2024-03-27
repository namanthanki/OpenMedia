import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostsList from "../components/PostsList";
import { useUser } from "../hooks/useUser";

// import "./styles/home.css";

const HomePage = () => {
	const { user } = useUser();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user && loading) {
			setLoading(false);
		}
	}, [user, loading]);

	if (loading) {
		return <div>Loading...</div>;
	}

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
