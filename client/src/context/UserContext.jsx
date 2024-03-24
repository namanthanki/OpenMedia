import { createContext, useContext, useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

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
		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, fetchUser, loading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	return useContext(UserContext);
};
