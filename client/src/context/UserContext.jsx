import { createContext, useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [needsRefetch, setNeedsRefetch] = useState(true);

	const fetchUser = async () => {
		try {
			const response = await axiosPrivate.get("user");
			response.data.user.profilePicture =
				"http://localhost:3000/" +
				response.data.user.profilePicture
					.split("\\")
					.join("/")
					.split("public/")[1];
			response.data.user.coverPicture =
				"http://localhost:3000/" +
				response.data.user.coverPicture
					.split("\\")
					.join("/")
					.split("public/")[1];
			setUser(response.data.user);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (needsRefetch) {
			fetchUser();
			setNeedsRefetch(false);
		}
	}, [needsRefetch]);

	return (
		<UserContext.Provider value={{ user, fetchUser, setNeedsRefetch, needsRefetch, loading }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;