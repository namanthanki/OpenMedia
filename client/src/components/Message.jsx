const Message = ({ isOutgoing, text }) => {
    return (
        <div
            className={`flex ${
                isOutgoing ? "justify-end" : ""
            } mb-4 cursor-pointer`}
        >
            {!isOutgoing && (
                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                    <img
                        src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                </div>
            )}
            <div
                className={`flex max-w-96 ${
                    isOutgoing ? "bg-accent text-white" : "bg-anotherBlack"
                } rounded-lg p-3 gap-3`}
            >
                <p>{text}</p>
            </div>
            {isOutgoing && (
                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                    <img
                        src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="My Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                </div>
            )}
        </div>
    );
};

export default Message;
