import { Link } from "react-router-dom";
import "./styles/welcome.css";

const WelcomePage = () => {
	return (
		<div className="welcome-page">
			<section className="banner">
				<img src="/images/welcome.png" alt="Welcome Banner" />
			</section>
			<section className="welcome-content">
				<header>
					<h1 className="welcome-header-text">OpenMedia</h1>
				</header>
				<p className="welcome-content-text">
					Social networking platform that lets everyone share their
					thoughts, knowledge and, words of wisdom with one another
					and communicate privately. Join us today and start sharing
					your thoughts.
				</p>
				<div className="welcome-actions">
					<Link to="/login" className="btn login-btn">
						Login
					</Link>
					<Link to="/register" className="btn register-btn">
						Register
					</Link>
				</div>
			</section>
		</div>
	);
};

export default WelcomePage;
