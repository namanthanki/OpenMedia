import ConversationBar from "../components/ConversationBar";
import Chat from "../components/Chat";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

const ChatsPage = () => {
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState([]);


    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axiosPrivate.get("/chat");
                setConversations(response.data.conversations);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <ConversationBar />
            <Chat />
        </div>
    );
};

export default ChatsPage;
