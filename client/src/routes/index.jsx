import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import WelcomePage from "../pages/WelcomePage.jsx";
import ChatsPage from "../pages/ChatsPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import SettingsPage from "../pages/SettingsPage.jsx";
import ExplorePage from "../pages/ExplorePage.jsx";
import SetupUser from "../pages/SetupUser.jsx";

const publicRoutes = [
	{
		path: "/",
		component: <WelcomePage />,
		index: true,
		name: "Welcome",
	},
	{
		path: "/login",
		component: <LoginPage />,
		name: "Login",
	},
	{
		path: "/register",
		component: <RegisterPage />,
		name: "Register",
	},
];

const privateRoutes = [
	{
		path: "/home",
		component: <HomePage />,
		index: true,
		name: "Home",
	},
	{
		path: "/chats",
		component: <ChatsPage />,
		name: "Chats",
	},
	{
		path: "/setup",
		component: <SetupUser />,
		name: "SetupUser",
	},
	{
		path: "/profile",
		component: <ProfilePage />,
		name: "ProfilePage",
	},
	{
		path: "/profile/:userId",
		component: <ProfilePage />,
		name: "ProfilePage",
	},
	{
		path: "/chats/:chatId",
		component: <ChatsPage />,
		name: "ChatsPage",
	},
	{
		path: "/settings",
		component: <SettingsPage />,
		name: "SettingsPage",
	},
	{
		path: "/explore",
		component: <ExplorePage />,
		name: "ExplorePage",
	},
];

export { publicRoutes, privateRoutes };
