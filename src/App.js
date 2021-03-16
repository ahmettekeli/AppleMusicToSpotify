import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./pages/Login";
import Convert from "./pages/Convert";
// import AppleMusicToSpotify from "./pages/AppleMusicToSpotify";
import "./App.css";
function App() {
	return (
		<div>
			<Header />
			<br />
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/convert">
					{/** Show if logged in. Double check */}
					<Convert />
				</Route>
				{/* <Route path="/applemusic-spotify">
					<AppleMusicToSpotify />
				</Route> */}
			</Switch>
		</div>
	);
}

export default App;
