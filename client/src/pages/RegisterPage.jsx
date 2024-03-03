import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/auth-defaults.css";
import "./styles/auth-forms.css";

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
		dateOfBirth: "",
		gender: "m",
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
					<h1 className="form-title">Register</h1>
					<p className="form-subtitle">
						Already have an account?{" "}
						<Link className="login-link" to="/login">
							Login
						</Link>
					</p>

					<form onSubmit={handleFormSubmit} method="post">
						<div className="form-row">
							<div className="form-cell">
								<label htmlFor="firstName">First Name</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									onChange={handleFormChange}
								/>
							</div>
							<div className="form-cell">
								<label htmlFor="lastName">Last Name</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									onChange={handleFormChange}
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="form-cell">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									onChange={handleFormChange}
								/>
							</div>
							<div className="form-cell">
								<label htmlFor="username">Username</label>
								<input
									type="text"
									id="username"
									name="username"
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
							<div className="form-cell">
								<label htmlFor="confirmPassword">
									Confirm Password
								</label>
								<input
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									onChange={handleFormChange}
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="form-cell full">
								<label htmlFor="dateOfBirth">
									Date of Birth
								</label>
								<input
									className="date-input"
									type="date"
									name="dateOfBirth"
									id="dateOfBirth"
									onChange={handleFormChange}
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="form-cell">
								<label className="gender-label">Gender</label>
								<div className="form-cell full">
									<div className="form-row">
										<div className="form-cell radio-item">
											<input
												type="radio"
												id="male"
												name="gender"
												value="m"
												defaultChecked
												onChange={handleFormChange}
											/>
											<label
												className="radio-label"
												htmlFor="male"
											>
												Male
											</label>
										</div>
										<div className="form-cell radio-item">
											<input
												type="radio"
												id="female"
												name="gender"
												value="f"
												onChange={handleFormChange}
											/>
											<label
												className="radio-label"
												htmlFor="female"
											>
												Female
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="form-row">
							<div className="form-cell full">
								<button className="submit-btn" type="submit">
									Register
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
