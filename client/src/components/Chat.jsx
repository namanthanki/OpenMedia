import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { axiosPrivate } from "../api/axios";
import { useSocket } from "../hooks/useSocket";

const Chat = ({ conversation, setConversations }) => {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const lastMessageRef = useRef(null);
    const { socket } = useSocket();

    useEffect(() => {
        socket.on("newMessage", (message) => {
            if (conversation._id === message.conversationId) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }

            setConversations((prevConversations) => {
                const updatedConversations = prevConversations.map(
                    (prevConversation) => {
                        if (
                            prevConversation._id === message.conversationId
                        ) {
                            return {
                                ...prevConversation,
                                lastMessage: {
                                    message: message.message,
                                    sender: message.sender,
                                },
                            };
                        }

                        return prevConversation;
                    }
                );

                return updatedConversations;
            });
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket, setConversations, conversation]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/chat/${conversation.userId}`
                );

                setMessages(response.data.messages);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        if (!conversation.mock) {
            console.log(conversation);
            getMessages();
        } else {
            setLoading(false);
        }
    }, [conversation.userId]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            const response = await axiosPrivate.post("/chat", {
                receiverId: conversation.userId,
                message,
            });

            if (response.data) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    response.data.chat,
                ]);

                setConversations((prevConversations) => {
                    const updatedConversations = prevConversations.map(
                        (prevConversation) => {
                            if (
                                prevConversation._id ===
                                conversation.conversationId
                            ) {
                                return {
                                    ...prevConversation,
                                    lastMessage: {
                                        message,
                                        sender: response.data.sender,
                                    },
                                };
                            }

                            return prevConversation;
                        }
                    );

                    return updatedConversations;
                });
            } else {
                console.error("Error occurred while sending message");
            }

            setMessage("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex-1 mt-20 fixed right-0 top-0 bottom-0 w-[calc(100%-25%)]">
            <header className="bg-formColor p-4 text-primary">
                <h1 className="text-2xl font-semibold">
                    {conversation.username}
                </h1>
            </header>
            <div className="h-screen overflow-y-auto p-4 pb-36">
                {loading && <p>Loading...</p>}
                {messages.map((message) => (
                    <div
                        key={message._id}
                        ref={
                            messages.length - 1 === messages.indexOf(message)
                                ? lastMessageRef
                                : null
                        }
                    >
                        <Message
                            avatar={conversation.userProfilePicture}
                            text={message.message}
                            isOutgoing={message.sender !== conversation.userId}
                        />
                    </div>
                ))}
            </div>
            <footer className="bg-formColor border-t border-gray-950 p-4 absolute right-0 bottom-0 w-full">
                <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Type a message..."
                        className="w-full p-2 rounded-md border bg-anotherBlack border-gray-950 focus:outline-none focus:border-accent"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-accent text-primary px-4 py-2 rounded-md ml-2 cursor-pointer"
                    >
                        Send
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default Chat;
