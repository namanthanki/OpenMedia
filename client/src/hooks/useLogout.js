import { axiosPrivate } from "../api/axios"
import useAuth from "./useAuth"
import { usePost } from "../context/PostContext";

const useLogout = () => {
    const { setAuth } = useAuth();
    const { setPosts, setMyPosts } = usePost();
    
    const logout = async () => {
        setAuth({});
        setPosts([]);
        setMyPosts([]);
        try {
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