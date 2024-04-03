import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { PostProvider } from "./context/PostContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <UserProvider>
                <SocketProvider>
                    <PostProvider>
                        <App />
                    </PostProvider>
                </SocketProvider>
            </UserProvider>
        </AuthProvider>
    </React.StrictMode>
);
