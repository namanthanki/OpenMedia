import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
const LOGIN_URL = "auth/login";

import "./styles/auth-defaults.css";
import "./styles/auth-forms.css";

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
			navigate(from, { replace: true });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="auth-container">
				<div className="auth-wrapper">
					<h1 className="form-title">Login</h1>
					<p className="form-subtitle">
						Don&#39;t have an account?{" "}
						<Link className="register-link" to="/register">
							Register
						</Link>
					</p>

					<form onSubmit={handleFormSubmit} method="post">
						<div className="form-row">
							<div className="form-cell">
								<label htmlFor="email">Email</label>
								<input
									type="text"
									id="email"
									name="email"
									onChange={handleFormChange}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-cell">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									name="password"
									onChange={handleFormChange}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-cell full">
								<button className="submit-btn" type="submit">
									Login
								</button>
							</div>
						</div>
						<div className="form-row">
							<div className="form-cell">
								<input
									type="checkbox"
									name="persist"
									id="persist"
									onChange={togglePersist}
									checked={persist}
								/>
								<label style={{display: "inline"}} htmlFor="persist">
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
