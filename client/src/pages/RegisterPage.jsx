import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-hot-toast";

// import "./styles/auth-defaults.css";
// import "./styles/auth-forms.css";

const RegisterPage = () => {
	const navigate = useNavigate();

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

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"/auth/register",
				JSON.stringify(formData),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 201) {
				toast.success("Account created successfully", {
					icon: "😇",
				});
				navigate("/login");
			} else {
				toast.error("Error creating account", {
					icon: "😢",
				});
				console.error(response);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="auth-container flex justify-center items-center h-screen">
				<div className="auth-wrapper flex flex-col justify-center items-center bg-formColor shadow rounded-md p-8 h-fit w-2/5 gap-2">
					<h1 className="form-title text-3xl text-accent font-semibold">Register</h1>
					<p className="form-subtitle text-sm text-primary font-light">
						Already have an account?{" "}
						<Link className="login-link text-accent font-medium cursor-pointer" to="/login">
							Login
						</Link>
					</p>

					<form className="flex flex-col mt-4 gap-3 w-full" onSubmit={handleFormSubmit} method="post">
						<div className="form-row flex gap-4">
							<div className="form-cell flex-1">
								<label className="block text-md font-light text-primary" htmlFor="firstName">First Name</label>
								<input
									className="mt-1 w-full p-2 bg-transparent rounded-md border border-accent outline outline-accent outline-0 focus:outline-1 transition-all shadow-sm sm:text-sm"
									type="text"
									id="firstName"
									name="firstName"
									onChange={handleFormChange}
								/>
							</div>
							<div className="form-cell flex-1">
								<label className="block text-md font-light text-primary" htmlFor="lastName">Last Name</label>
								<input
									className="mt-1 w-full p-2 bg-transparent rounded-md border border-accent outline outline-accent outline-0 focus:outline-1 transition-all shadow-sm sm:text-sm"
									type="text"
									id="lastName"
									name="lastName"
									onChange={handleFormChange}
								/>
							</div>
						</div>

						<div className="form-row flex gap-4">
							<div className="form-cell flex-1">
								<label className="block text-md font-light text-primary" htmlFor="email">Email</label>
								<input
									className="mt-1 w-full p-2 bg-transparent rounded-md border border-accent outline outline-accent outline-0 focus:outline-1 transition-all shadow-sm sm:text-sm"
									type="email"
									id="email"
									name="email"
									onChange={handleFormChange}
								/>
							</div>
							<div className="form-cell flex-1">
								<label className="block text-md font-light text-primary" htmlFor="username">Username</label>
								<input
									className="mt-1 w-full p-2 bg-transparent rounded-md border border-accent outline outline-accent outline-0 focus:outline-1 transition-all shadow-sm sm:text-sm"
									type="text"
									id="username"
									name="username"
									onChange={handleFormChange}
								/>
							</div>
						</div>

						<div className="form-row flex gap-4">
							<div className="form-cell flex-1">
								<label className="block text-md font-light text-primary" htmlFor="password">Password</label>
								<input
									className="mt-1 w-full p-2 bg-transparent rounded-md border border-accent outline outline-accent outline-0 focus:outline-1 transition-all shadow-sm sm:text-sm"
									type="password"
									id="password"
									name="password"
									onChange={handleFormChange}
								/>
							</div>
							<div className="form-cell flex-1">
								<label className="block text-md font-light text-primary" htmlFor="confirmPassword">
									Confirm Password
								</label>
								<input
									className="mt-1 w-full p-2 bg-transparent rounded-md border border-accent outline outline-accent outline-0 focus:outline-1 transition-all shadow-sm sm:text-sm"
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									onChange={handleFormChange}
								/>
							</div>
						</div>

						<div className="form-row flex gap-4">
							<div className="form-cell full flex-1 w-full">
								<label className="block text-md font-light text-primary" htmlFor="dateOfBirth">
									Date of Birth
								</label>
								<input
									className="date-input w-full bg-transparent p-2 rounded-md border border-accent outline outline-accent outline-0 focus:outline-1 transition-all shadow-sm sm:text-sm dark:[color-scheme:dark]"
									type="date"
									name="dateOfBirth"
									id="dateOfBirth"
									onChange={handleFormChange}
								/>
							</div>
						</div>

						<div className="form-row flex gap-4">
							<div className="form-cell flex-1">
								<label className="gender-label">Gender</label>
								<div className="form-cell full flex-1 w-full">
									<div className="form-row flex gap-4">
										<div className="form-cell radio-item flex-1">
											<label
												// className="radio-label block border border-accent px-4 py-2 rounded-md cursor-pointer min-w-fit whitespace-nowrap relative transition-all"
												className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-accent has-[:checked]:ring-1 has-[:checked]:ring-accent dark:border-gray-800 dark:bg-transparent dark:hover:border-gray-700"
												htmlFor="male"
											>
												Male
												<input
													className="size-5 border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
													type="radio"
													id="male"
													name="gender"
													value="m"
													defaultChecked
													onChange={handleFormChange}
												/>
											</label>
										</div>
										<div className="form-cell radio-item flex-1">
											<label
												className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-accent has-[:checked]:ring-1 has-[:checked]:ring-accent dark:border-gray-800 dark:bg-transparent dark:hover:border-gray-700"
												htmlFor="female"
											>
												Female
												<input
													className="size-5 border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
													type="radio"
													id="female"
													name="gender"
													value="f"
													onChange={handleFormChange}
												/>
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="form-row flex">
							<div className="form-cell full flex-1 w-full">
								<button className="submit-btn block my-4 w-full py-2 text-accent font-medium cursor-pointer border-2 border-accent rounded-full text-center hover:bg-accent hover:text-primary hover:transition-colors" type="submit">
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
