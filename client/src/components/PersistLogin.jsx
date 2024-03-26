import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { fetchUser } = useUser();
	const { auth, persist } = useAuth();

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
				await fetchUser();
			} catch (error) {
				console.error(error);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		!auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

		return () => isMounted = false;
	}, [auth?.accessToken, refresh, fetchUser]);

	useEffect(() => {
		console.log(`isLoading: ${isLoading}`);
		console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
	}, [isLoading, auth?.accessToken]);

	return (
		<div>
			{
				!persist 
					? <Outlet />
					: isLoading 
						? <div>Loading...</div> 
						: <Outlet />
			}
		</div>
	);
};

export default PersistLogin;
