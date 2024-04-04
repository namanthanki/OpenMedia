const UserCard = () => {
    return (
        <div className="user-card flex items-center gap-5 p-4 bg-formColor rounded-md">
            <img
                className="user-card-author w-10 h-10 rounded-full object-cover"
                src=""
                alt="User's Image"
            />
            <div className="user-card-info flex flex-col">
                <div className="user-card-username text-md font-semibold">
                    Username
                </div>
                <div className="user-card-name text-sm font-light">
                    Full Name
                </div>
            </div>
        </div>
    );
};

export default UserCard;
