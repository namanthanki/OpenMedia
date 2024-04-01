import ConversationTile from "./ConversationTile";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { axiosPrivate } from "../api/axios";

const ConversationBar = ({ conversations, setSelectedConversation }) => {
    const { user } = useUser();
    const [searching, setSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSelectConversation = (
        id,
        userId,
        userProfilePicture,
        username
    ) => {
        setSelectedConversation({
            conversationId: id,
            userId,
            userProfilePicture,
            username,
        });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearching(true);
        try {
            const response = await axiosPrivate.get(
                `/chat/user/${searchQuery}`
            );

            console.log(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setSearching(false);
        }
    };

    return (
        <div className="w-1/4 mt-20 bg-anotherBlack border-r border-gray-950">
            <header className="p-4 border-b border-gray-950 flex justify-between items-center bg-accent text-white">
                <h1 className="text-2xl font-semibold">Chats</h1>
            </header>
            <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                <form className="flex items-center justify-between p-2 bg-formColor rounded-md">
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className="w-full mr-2 p-2 rounded-md bg-formColor border border-gray-950 focus:outline-none focus:border-accent"
                    />
                    <button
                        className="text-primary"
                        onClick={(e) => handleSearch(e)}
                    >
                        Search
                    </button>
                </form>

                {conversations.map((conversation) => {
                    const memberToDisplay = conversation.members.filter(
                        (member) => member._id !== user._id
                    )[0];

                    const messagePreview =
                        conversation.lastMessage.message.length > 20
                            ? conversation.lastMessage.message.slice(0, 20) +
                              "..."
                            : conversation.lastMessage.message;

                    const displayMessage =
                        conversation.lastMessage.sender === user._id
                            ? `You: ${messagePreview}`
                            : messagePreview;

                    return (
                        <ConversationTile
                            key={memberToDisplay._id}
                            id={conversation._id}
                            userId={memberToDisplay._id}
                            name={memberToDisplay.username}
                            message={displayMessage}
                            avatar={memberToDisplay.profilePicture}
                            handleClick={handleSelectConversation}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ConversationBar;
