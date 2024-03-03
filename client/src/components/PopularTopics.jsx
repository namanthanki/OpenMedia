const PopularTopics = () => {
	const popularTopics = [
		"React.js",
		"Node.js",
		"JavaScript",
		"CSS",
		"Frontend Development",
	];

	return (
		<div className="popular-topics">
			<h3>Popular Topics</h3>
			<ul>
				{popularTopics.map((topic) => (
					<li key={topic}>{topic}</li>
				))}
			</ul>
		</div>
	);
};

export default PopularTopics;
