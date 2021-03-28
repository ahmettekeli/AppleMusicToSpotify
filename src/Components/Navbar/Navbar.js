import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import menuItems from "./MenuItems";

const Navbar = (props) => {
	const logo = "LOGO",
		[isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen((prevState) => !prevState);
	};
	return (
		<Nav>
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
		</Nav>
	);
};

const Nav = styled.nav`
	background: linear-gradient(90deg, rgba(43, 200, 184, 1) 21%, rgba(0, 255, 186, 1) 100%);
	/* width: 100%; */
	height: 80px;
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.logo {
		padding: 15px 0;
		justify-self: start;
		margin-left: 20px;
		cursor: pointer;
	}
	.burger-icon {
		display: none;
	}

	.nav-menu {
		list-style: none;
		display: flex;
		flex-flow: row nowrap;
	}

	li {
		padding: 10px 10px;
		color: white;
		text-decoration: none;
		font-size: 1.5rem;
	}
	li:hover {
		background-color: rgba(43, 200, 184, 1);
		border-radius: 4px;
		transition: all 0.2s ease-out;
	}

	a {
		text-decoration: none;
	}

	@media screen and (max-width: 770px) {
		nav {
			position: relative;
		}
		.nav-menu {
			flex-direction: column;
			width: 100%;
			position: absolute;
			top: 80px;
			right: -100%;
			opacity: 1;
			transition: all 0.5s ease;
		}
		li {
			text-align: center;
			padding: 2rem;
			width: 100%;
			display: table;
		}
		li:hover {
			background-color: rgba(43, 200, 184, 1);
			border-radius: 0;
		}
		.logo {
			position: absolute;
			top: 0;
			left: 0;
			transform: translate(25% 50%);
		}
		.burger-icon {
			color: white;
			display: block;
			position: absolute;
			top: 0;
			right: 0;
			transform: translate(-100%, 60%);
			font-size: 1.8rem;
			cursor: pointer;
		}

		.nav-menu.active {
			background: rgba(43, 200, 184, 1);
			right: 0;
			opacity: 1;
			transition: all 0.5s ease;
			z-index: 1;
		}
		.fa-times {
			color: white;
			font-size: 2rem;
		}
	}
`;

export default Navbar;
