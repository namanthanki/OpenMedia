import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage.jsx";
import ChatsPage from "./pages/ChatsPage.jsx";
import RootLayout from "./routes/RootLayout.jsx";
import "./index.css";

const isLoggedIn = true;

const router = createBrowserRouter([
	isLoggedIn ? {
		path: "/",
		element: <RootLayout />,
		children: [
			{ path: "/", element: <App /> },
			{ path: "/chats", element: <ChatsPage /> },
		],
	} : {
		path: "/",
		element: <WelcomePage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
