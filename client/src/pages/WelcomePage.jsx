import { Link } from "react-router-dom";
// import "./styles/welcome.css";

const WelcomePage = () => {
	return (
		<div className="welcome-page flex w-screen h-screen">
			<section className="banner m-0 p-0 w-1/2">
				<img className="w-full h-screen object-cover" src="/images/welcome.png" alt="Welcome Banner" />
			</section>
			<section className="welcome-content flex flex-col justify-center items-center gap-8">
				<header>
					<h1 className="welcome-header-text text-accent text-8xl font-semibold">OpenMedia</h1>
				</header>
				<p className="welcome-content-text w-8/12 text-lg font-normal text-justify">
					Social networking platform that lets everyone share their
					thoughts, knowledge and, words of wisdom with one another
					and communicate privately. Join us today and start sharing
					your thoughts.
				</p>
				<div className="welcome-actions">
					<Link to="/login" className="block m-3 px-24 py-3 bg-accent text-primary font-medium cursor-pointer rounded-full text-center hover:bg-primary hover:text-accent hover:transition-colors">
						Login
					</Link>
					<Link to="/register" className="block m-3 px-24 py-3 text-accent font-medium cursor-pointer border-2 border-accent rounded-full text-center hover:bg-accent hover:text-primary hover:transition-colors">
						Register
					</Link>
				</div>
			</section>
		</div>
	);
};

export default WelcomePage;
