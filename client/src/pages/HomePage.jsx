import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostsList from "../components/PostsList";
import { useUser } from "../hooks/useUser";
import { toast } from "react-hot-toast";

// import "./styles/home.css";

const HomePage = () => {
    const { user } = useUser();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && loading) {
            setLoading(false);
        }
    }, [user, loading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-container flex flex-col justify-center items-center gap-4 mt-24 mb-5">
            <CreatePost
                authorImage={user?.profilePicture}
                authorUsername={user?.username}
            />
            <div className="max-w-1/4 w-1/4">
                <PostsList />
            </div>
        </div>
    );
};

export default HomePage;
