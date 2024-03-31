import { useState } from "react";
import Message from "./Message";

const Chat = () => {
    return (
        <div className="flex-1 mt-20">
            {/* Chat Header */}
            <header className="bg-formColor p-4 text-primary">
                <h1 className="text-2xl font-semibold">Alice</h1>
            </header>
            {/* Chat Messages */}
            <div className="h-screen overflow-y-auto p-4 pb-36">
                {/* Message components go here */}
                <Message text="Hey Bob, how's it going?" />
                <Message
                    text="Hi Alice! I'm good, just finished a great book. How about you?"
                    isOutgoing
                />
            </div>
            {/* Chat Input */}
            <footer className="bg-formColor border-t border-gray-950 p-4 absolute bottom-0 w-3/4">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full p-2 rounded-md border bg-anotherBlack border-gray-950 focus:outline-none focus:border-accent"
                    />
                    <button className="bg-accent text-primary px-4 py-2 rounded-md ml-2">
                        Send
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Chat;
