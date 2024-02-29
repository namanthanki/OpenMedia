import CreatePost from "../components/CreatePost";
import PostsList from "../components/PostsList";
import "./styles/home.css";

const HomePage = () => {
	return (
		<div className="home-container">
			<CreatePost
				authorImage={"/images/author-placeholder.png"}
				authorUsername={"Naman Thanki"}
			/>
			<PostsList />
		</div>
	);
};

export default HomePage;
