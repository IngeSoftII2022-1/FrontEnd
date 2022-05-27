import { LinearProgress, Link, Paper, Typography } from "@mui/material";
import { useState } from "react";

import * as yup from "yup";
import API from "../config/axios";
import {
	Form,
	FormButton,
	FormCheckbox,
	FormInput,
	FormPassword,
} from "./Form";

const schema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = (data) => {
		console.log({ data });
		setSubmitting(true);
		API.post("/users/login", data)
			.then((res) => {
				console.log(res);
				setSubmitting(false);
			})
			.catch((err) => {
				console.log(err);
				setSubmitting(false);
			});
	};

	const forgotPassword = () => {
		// TODO: forgot password functionality
		console.log("forgot password");
	};

	return (
		<Paper elevation={24} style={{ padding: "1rem", borderRadius: "1rem" }}>
			{submitting && <LinearProgress />}
			<Form title="Login" schema={schema} onSubmit={onSubmit}>
				<Typography
					align="center"
					style={{ fontWeight: "bold" }}
					variant="h4"
					gutterBottom
				>
					Login
				</Typography>
				<FormInput name="email" label="Email" />
				<FormPassword name="password" label="Password" />
				<FormCheckbox name="remember" label="Remember me" defaultChecked />
				<Typography variant="body2" color="textSecondary" align="center">
					<Link onClick={forgotPassword} style={{ textDecoration: "none" }}>
						Forgot Password?
					</Link>
				</Typography>
				<FormButton label="Login" />
				<Typography
					align="center"
					color="textSecondary"
					variant="body2"
					style={{ marginTop: "1rem" }}
				>
					Not a member?{" "}
					<Link href="/users/signup" style={{ textDecoration: "none" }}>
						Sign Up
					</Link>
				</Typography>
			</Form>
		</Paper>
	);
};

export default LoginForm;
