import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostsList from "../components/PostsList";
import { useUser } from "../hooks/useUser";

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
        <div className="home-container flex flex-col justify-center items-center gap-4 mt-24">
            <CreatePost
                authorImage={user?.profilePicture}
                authorUsername={user?.username}
            />
            <div className="max-w-lg">
                <PostsList />
            </div>
        </div>
    );
};

export default HomePage;
