import React from "react";
import { FaBars } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Header = (props) => {
	const logo = "LOGO";
	return (
		<nav>
			<div className="nav-center">
				<div className="nav-header">
					<img src={logo} alt="logo"/>
					<button className="nav-toggle">
						<FaBars />
					</button>
				</div>
				<div className="links-container show-container">
					<ul className="links">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>


		// <nav className="navbar navbar-default">
		// 	<div className="container">
		// 		<div className="navbar-header">
		// 			<ul className="nav navbar-nav">
		// 				<li>
		// 					<Link to="/">Home</Link>
		// 				</li>
		// 				<li>
		// 					<Link to="/login">Login</Link>
		// 				</li>
		// 			</ul>
		// 		</div>
		// 	</div>
		// </nav>
	);
};
export default Header;
