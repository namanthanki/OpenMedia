// import Card from "../components/Card";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/auth-defaults.css";
import "./styles/auth-forms.css";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleFormChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		console.log("Form submitted:", formData);
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
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
