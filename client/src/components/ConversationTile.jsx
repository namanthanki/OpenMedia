const ConversationTile = ({
    mock,
    id,
    userId,
    name,
    message,
    avatar,
    handleClick,
}) => {
    return (
        <div
            className="flex items-center mb-4 cursor-pointer hover:bg-formColor p-2 rounded-md"
            onClick={() => handleClick(mock, id, userId, avatar, name)}
        >
            <div className="w-12 h-12 rounded-full mr-3">
                <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                />
            </div>
            <div className="flex-1">
                <h2 className="text-lg text-primary font-semibold">{name}</h2>
                <p className="text-grayLight">{message}</p>
            </div>
        </div>
    );
};

export default ConversationTile;
