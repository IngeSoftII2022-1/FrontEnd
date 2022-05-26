import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup.jsx";
import Home from "./views/Home";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Nav from "./components/Nav";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Nav />
		<BrowserRouter>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/users/login" element={<Login />} />
				<Route path="/users/signup" element={<Signup />} />
				<Route path="*" element={<Navigate to="/home" />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
