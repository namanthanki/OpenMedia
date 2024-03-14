import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { useAuth } from "./useAuth";

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		const requestInterceptor = axiosPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers["Authorization"]) {
					config.headers["Authorization"] = auth?.accessToken;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseInterceptor = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 403 && !prevRequest.sent) {
					prevRequest.sent = true;
					const accessToken = await refresh();
					prevRequest.headers["Authorization"] = accessToken;
					return axiosPrivate(prevRequest);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axiosPrivate.interceptors.response.eject(responseInterceptor);
			axiosPrivate.interceptors.request.eject(requestInterceptor);
		};
	}, [auth, refresh]);

	return axiosPrivate;
};

export default useAxiosPrivate;
