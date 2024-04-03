import ConversationBar from "../components/ConversationBar";
import Chat from "../components/Chat";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

const ChatsPage = () => {
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axiosPrivate.get("/chat");

                Promise.all(
                    response.data.conversations.map((conversation) => {
                        conversation.members.map((member) => {
                            member.profilePicture = `http://localhost:3000/${
                                member.profilePicture
                                    .split("\\")
                                    .join("/")
                                    .split("public/")[1]
                            }`;

                            return member;
                        });
                        return conversation;
                    })
                );

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
            {loading && (
                <div className="flex items-center justify-center w-full h-full">
                    <p>Loading...</p>
                </div>
            )}

            <ConversationBar
                conversations={conversations}
                setConversations={setConversations}
                setSelectedConversation={setSelectedConversation}
            />
            {!selectedConversation && (
                <div className="ml-[calc(100%-75%)] w-full h-screen">
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="text-anotherGray text-2xl">
                            Select a conversation to start chatting
                        </p>
                    </div>
                </div>
            )}
            {selectedConversation && (
                <Chat
                    conversation={selectedConversation}
                    setConversations={setConversations}
                />
            )}
        </div>
    );
};

export default ChatsPage;
