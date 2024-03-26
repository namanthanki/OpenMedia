import { axiosPrivate } from "../api/axios"
import { useUser } from "./useUser";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setUser, setNeedsRefetch } = useUser();
    const { setAuth, setPersist } = useAuth();

    const logout = async () => {
        try {
            setUser({});
            setAuth({});
            setPersist(false);
            setNeedsRefetch(true);
            const response = await axiosPrivate.post("auth/logout", {}, {
                withCredentials: true
            });
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    return logout;
}

export default useLogout