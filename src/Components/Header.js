import React from "react";

const Header = (props) => {
	return (
		<nav className="navbar navbar-default">
			<div className="container">
				<div className="navbar-header">
					<ul className="nav navbar-nav">
						<li>
							<a href="">Home</a>
						</li>
						<li>
							<a href="">Convert</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
export default Header;