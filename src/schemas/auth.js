import * as yup from "yup";
import zxcvbn from "zxcvbn";

const password = yup
	.string()
	.min(8, "Password must be at least 8 characters long")
	.test("zxcvbn", "Weak Password", function (value) {
		const { path, createError } = this;

		const email = this.parent.email;
		const invalidWords = [...email.split("@"), email];

		if (this.parent.name) {
			invalidWords.push(this.parent.name);
		}

		const estimation = zxcvbn(value, invalidWords);

		const { score, feedback } = estimation;

		if (score < 3) {
			return createError({
				message: feedback.suggestions[0],
				path: path,
				// type: "zxcvbn",
				// score: score,
			});
		}
		return true;
	})
	.required();
const confirmPassword = yup
	.string()
	.oneOf([yup.ref("password"), null], "Passwords must match")
	.required();
const email = yup.string().email("Email must be valid").required();
const name = yup.string().required();
const phone = yup.string();
const identityCardType = yup
	.string()
	.required("Identity card type is required");
const identityCard = yup.string().required("Identity card is required");
const roleId = yup.string().required("Role is required");

export const loginSchema = yup.object().shape({
	email,
	password,
});

export const signupSchema = yup.object().shape({
	name,
	email,
	password,
	confirmPassword,
	phone,
	identityCardType,
	identityCard,
	roleId,
});

export const passwordResetSchema = yup.object().shape({
	password,
	confirmPassword,
});
