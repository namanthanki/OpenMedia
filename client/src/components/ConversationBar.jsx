import ConversationTile from "./ConversationTile";

const ConversationBar = () => {
    return (
        <div className="w-1/4 mt-20 bg-anotherBlack border-r border-gray-950">
            <header className="p-4 border-b border-gray-950 flex justify-between items-center bg-accent text-white">
                <h1 className="text-2xl font-semibold">Chats</h1>
            </header>
            {/* Contact List */}
            <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                {/* Contact components go here */}
                <ConversationTile
                    name="Alice"
                    message="Hoorayy!!"
                    avatar="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                />
                <ConversationTile
                    name="Martin"
                    message="That pizza place was amazing! We should go again sometime. 🍕"
                    avatar="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                />
            </div>
        </div>
    );
};

export default ConversationBar;
