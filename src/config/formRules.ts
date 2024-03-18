import { emailRegex } from "../utils/regex";

// Login
export const formRulesLogin = {
    email: {
        required: "Please input your email",
        pattern: { value: emailRegex, message: "Invalid email address" },
    },
    password: {
        required: "Please input your password",
        minLength: { value: 6, message: "Password must have at least 6 characters" },
    },

};