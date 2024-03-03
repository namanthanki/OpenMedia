import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage.jsx";
import ChatsPage from "./pages/ChatsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import RootLayout from "./routes/RootLayout.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
	
import "./index.css";

const isLoggedIn = true;

const router = createBrowserRouter([
	isLoggedIn ? ({
		path: "/",
		element: <RootLayout />,
		children: [
			{ path: "/", element: <App /> },
			{ path: "/chats", element: <ChatsPage /> },
			{ path: "/profile",	element: <ProfilePage /> },
			{ path: "/chats/:chatId", element: <ChatsPage /> },
			{ path: "/settings", element: <SettingsPage /> },
			{ path: "/explore", element: <ExplorePage /> }
		],
	}) : ({
		path: "/",
		element: <WelcomePage />,
	}),
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "*",
		element: <h1>404 Not Found</h1>,
	}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
