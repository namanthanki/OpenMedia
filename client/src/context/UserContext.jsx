import { createContext, useContext, useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axiosPrivate.get("user");
				response.data.user.profilePicture =
					"http://localhost:3000/" +
					response.data.user.profilePicture
						.split("\\")
						.join("/")
						.split("public/")[1];
				setUser(response.data.user);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, loading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	return useContext(UserContext);
};
