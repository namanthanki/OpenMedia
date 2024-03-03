const RecommendedUsers = () => {
	const recommendedUsers = [
		{ id: 1, username: "user1", fullName: "User One" },
		{ id: 2, username: "user2", fullName: "User Two" },
		{ id: 3, username: "user3", fullName: "User Three" },
	];

	return (
		<div className="recommended-users">
			<h3>Recommended Users</h3>
			<ul>
				{recommendedUsers.map((user) => (
					<li key={user.id}>
						{user.fullName} ({user.username})
					</li>
				))}
			</ul>
		</div>
	);
};

export default RecommendedUsers;
