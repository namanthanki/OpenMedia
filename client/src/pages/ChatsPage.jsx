import { MdSend } from "react-icons/md";

const ChatsPage = () => {
    return (
        <div className="chat-wrapper flex justify-center items-center h-screen bg-background">
            <div className="chat-container bg-anotherBlack rounded-lg shadow-lg w-full max-w-md">
                <div className="chat-header bg-formColor text-white px-4 py-2 rounded-t-lg">Username</div>
                <div className="chat-messages p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 150px)" }}>
                    <div className="message sent">
                        <div className="message-text bg-blue-500 text-white py-2 px-4 rounded-lg inline-block">
                            Hello! How are you doing?
                        </div>
                        <div className="message-time text-gray-500 text-sm ml-2">10:00 AM</div>
                    </div>
                    <div className="message received">
                        <div className="message-text bg-gray-200 text-black py-2 px-4 rounded-lg inline-block">
                            Hi there! I'm good, thanks for asking.
                        </div>
                        <div className="message-time text-gray-500 text-sm ml-2">10:05 AM</div>
                    </div>
                    {/* More messages go here */}
                </div>
                <div className="chat-input flex items-center bg-anotherBlack border-grayLight border-t px-4 py-2 rounded-b-lg">
                    <input type="text" placeholder="Type a message..." className="flex-1 py-1 px-2 rounded-lg text-background focus:outline-none focus:ring focus:border-blue-500" />
                    <MdSend className="send-icon ml-2 text-blue-500 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default ChatsPage;
