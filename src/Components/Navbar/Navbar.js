import React, { useState } from "react";
import { Link } from "react-router-dom";
import menuItems from "./MenuItems";
import "./navbar.style.css";

const Navbar = (props) => {
	const logo = "LOGO",
		[isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen((prevState) => !prevState);
	};
	return (
		<nav>
			<div className="logo">
				<img src={logo} alt="logo" />
			</div>
			<div className="burger-icon" onClick={handleClick}>
				<i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
			</div>
			<ul className={isOpen ? "nav-menu active" : "nav-menu"}>
				{menuItems.map((item, index) => (
					<li key={index}>
						<Link to={item.url}>{item.name}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
