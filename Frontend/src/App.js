import { Route } from "react-router-dom";
import React from "react";
import Login from "./Components/Login";
import Loggedin from "./Components/Loggedin";
import Header from "./Components/Header";
import "./App.css";
function App() {
	return (
		<div>
			<Header />
			<br />
			<Login />
			<Route path="/signedin" component={Loggedin} />
		</div>
	);
}

export default App;
