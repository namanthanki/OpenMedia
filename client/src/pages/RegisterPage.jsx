// import Card from "../components/Card";
import { Link } from "react-router-dom";
import "./styles/register.css";

const RegisterPage = () => {
	return (
		<div>
			<div className="auth-container">
				<div className="auth-wrapper">
					{/* <Card> */}
					<h1 className="form-title">Register</h1>
					<p className="form-subtitle">
						Already have an account?{" "}
						<Link className="login-link" to="/login">
							Login
						</Link>
					</p>

					<form onSubmit={null} method="post">
						<div className="form-row">
							<div className="form-cell">
								<label htmlFor="firstName">First Name</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
								/>
							</div>
              <div className="form-cell">
								<label htmlFor="username">Username</label>
								<input
									type="text"
									id="username"
									name="username"
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
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-cell">
								<button className="submit-btn" type="submit">
									Login
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			{/* </Card> */}
		</div>
	);
};

export default RegisterPage;
