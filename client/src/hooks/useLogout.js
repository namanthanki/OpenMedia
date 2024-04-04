import { axiosPrivate } from "../api/axios"
import { useUser } from "./useUser";
import useAuth from "./useAuth";
import { usePost } from "./usePost";

const useLogout = () => {
    const { setUser, setLoading } = useUser();
    const { setAuth, setPersist } = useAuth();
    const { setPosts, setMyPosts } = usePost();

    const logout = async () => {
        try {
            setPosts([]);
            setMyPosts([]);
            setUser(null);
            setLoading(true);
            setAuth({});
            setPersist(false);
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