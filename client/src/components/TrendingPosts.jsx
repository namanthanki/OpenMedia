const TrendingPosts = () => {
	const trendingPosts = [
		{ id: 1, title: "Lorem ipsum dolor sit amet", author: "John Doe" },
		{ id: 2, title: "Consectetur adipiscing elit", author: "Jane Smith" },
		{
			id: 3,
			title: "Sed do eiusmod tempor incididunt",
			author: "Alice Johnson",
		},
	];

	return (
		<div className="trending-posts">
			<h3>Trending Posts</h3>
			<ul>
				{trendingPosts.map((post) => (
					<li key={post.id}>
						{post.title} by {post.author}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TrendingPosts;
