import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
const LOGIN_URL = "auth/login";

// import "./styles/auth-defaults.css";
// import "./styles/auth-forms.css";

const LoginPage = () => {
	const { setAuth, persist, setPersist } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/home";

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const togglePersist = () => {
		setPersist((prev) => !prev);
	};

	useEffect(() => {
		localStorage.setItem("persist", persist);
	}, [persist]);

	const handleFormChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify(formData),
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);

			const userId = response?.data?.user.userId;
			const accessToken = response?.data?.user.accessToken;
			const refreshToken = response?.data?.user.refreshToken;
			setAuth({ userId, accessToken, refreshToken });
			if (response?.data?.user?.isSetup === false) {
				navigate("/setup", { replace: true });
				return;
			}
			navigate(from, { replace: true });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="auth-container flex justify-center items-center h-screen">
				<div className="auth-wrapper flex flex-col justify-center items-center bg-formColor shadow rounded-md p-8 h-96 w-96 gap-2">
					<h1 className="form-title text-3xl text-accent font-semibold">Login</h1>
					<p className="form-subtitle text-sm text-primary font-light">
						Don&#39;t have an account?{" "}
						<Link className="register-link text-accent font-medium cursor-pointer" to="/register">
							Register
						</Link>
					</p>

					<form className="w-full" onSubmit={handleFormSubmit} method="post">
						<div className="form-row my-2">
							<div className="form-cell">
								<label className="block text-md font-light text-primary" htmlFor="email">Email</label>
								<input
									className="mt-1 w-full p-2 bg-transparent rounded-md border border-accent outline outline-accent outline-0 focus:outline-1 transition-all shadow-sm sm:text-sm"
									type="text"
									id="email"
									name="email"
									onChange={handleFormChange}
								/>
							</div>
						</div>
						<div className="form-row my-2">
							<div className="form-cell">
								<label className="block text-md font-light text-primary" htmlFor="password">Password</label>
								<input
									className="mt-1 w-full p-2 bg-transparent rounded-md border border-accent outline outline-accent outline-0 focus:outline-1 transition-all shadow-sm sm:text-sm"
									type="password"
									id="password"
									name="password"
									onChange={handleFormChange}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-cell full">
								<button className="submit-btn block my-4 w-full py-2 bg-accent text-primary font-medium cursor-pointer rounded-full text-center hover:bg-primary hover:text-accent hover:transition-colors" type="submit">
									Login
								</button>
							</div>
						</div>
						<div className="form-row">
							<div className="form-cell">
								<input
									className="m-2"
									type="checkbox"
									name="persist"
									id="persist"
									onChange={togglePersist}
									checked={persist}
								/>
								<label
									className="inline text-sm font-light text-center text-primary"
									htmlFor="persist"
								>
									Trust This Device
								</label>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
