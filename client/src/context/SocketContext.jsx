import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useUser } from "../hooks/useUser";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const socket = io("http://localhost:3000", {
            query: {
                userId: user?._id,
            },
        });

        setSocket(socket);

        socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socket && socket.close();
        };
    }, [user?._id]);

    console.log(onlineUsers);

    return (
        <SocketContext.Provider
            value={{
                socket,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
