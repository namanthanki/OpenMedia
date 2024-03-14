import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import { publicRoutes, privateRoutes } from "./routes";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

const App = () => {
	const PublicRoutes = publicRoutes.map((route, index) => {
		return (
			<Route
				key={index}
				path={route.path}
				element={route.component}
				index={route.index}
			/>
		);
	});

	const PrivateRoutes = (
		<Route element={<PersistLogin />}>
			<Route element={<RequireAuth />}>
				{privateRoutes.map((route, index) => {
					return (
						<Route
							key={index}
							path={route.path}
							element={route.component}
							index={route.index}
						/>
					);
				})}
			</Route>
		</Route>
	);

	return (
		<>
			<BrowserRouter>
				<Routes>
					{PublicRoutes}
					<Route element={<RootLayout />}>
						{/* <Route element={<PersistLogin />}> */}
						{PrivateRoutes}
						{/* </Route> */}
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
