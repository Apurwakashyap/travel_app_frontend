import "./Auth.css";
import { useAuth, useAlert } from "../../context";
import {
    validateEmail,
    validateName,
    validateNumber,
    validatePassword,
} from "../../utils";
import { signupHandler } from "../../services";
import { useState } from "react";

export const AuthSignup = () => {
    const { username, email, password, number, confirmPassword, authDispatch } =
        useAuth();
    const { setAlert } = useAlert();

    // Error states for each input
    const [errors, setErrors] = useState({
        number: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleNumberChange = (event) => {
        const value = event.target.value;
        if (validateNumber(value)) {
            authDispatch({ type: "NUMBER", payload: value });
            setErrors((prev) => ({ ...prev, number: "" }));
        } else {
            setErrors((prev) => ({ ...prev, number: "Invalid Mobile Number" }));
        }
    };

    const handleNameChange = (event) => {
        const value = event.target.value;
        if (validateName(value)) {
            authDispatch({ type: "NAME", payload: value });
            setErrors((prev) => ({ ...prev, name: "" }));
        } else {
            setErrors((prev) => ({ ...prev, name: "Invalid Name" }));
        }
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        if (validateEmail(value)) {
            authDispatch({ type: "EMAIL", payload: value });
            setErrors((prev) => ({ ...prev, email: "" }));
        } else {
            setErrors((prev) => ({ ...prev, email: "Invalid Email Address" }));
        }
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        if (validatePassword(value)) {
            authDispatch({ type: "PASSWORD", payload: value });
            setErrors((prev) => ({ ...prev, password: "" }));
        } else {
            setErrors((prev) => ({ ...prev, password: "Password is too weak" }));
        }
    };

    const handleConfirmPasswordChange = (event) => {
        const value = event.target.value;
        if (value === password) {
            authDispatch({ type: "CONFIRM_PASSWORD", payload: value });
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        } else {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match",
            }));
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (
            !errors.number &&
            !errors.name &&
            !errors.email &&
            !errors.password &&
            !errors.confirmPassword
        ) {
            try {
                await signupHandler(username, number, email, password, setAlert);
                authDispatch({ type: "CLEAR_USER_DATA" });
            } catch (err) {
                setAlert({
                    open: true,
                    message: err.response?.data?.message || "Signup failed",
                    type: "error",
                });
            }
        } else {
            setAlert({
                open: true,
                message: "Please fix the validation errors",
                type: "error",
            });
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleFormSubmit}>
                {/* Mobile Number */}
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">
                        Mobile Number <span className="asterisk">*</span>{" "}
                    </label>
                    <input
                        defaultValue={number}
                        type="number"
                        className="auth-input"
                        maxLength="10"
                        placeholder="Enter Mobile Number"
                        required
                        onChange={handleNumberChange}
                    />
                    {errors.number && <p className="error-text">{errors.number}</p>}
                </div>

                {/* Name */}
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">
                        Name <span className="asterisk">*</span>{" "}
                    </label>
                    <input
                        defaultValue={username}
                        className="auth-input"
                        placeholder="Enter Name"
                        required
                        onChange={handleNameChange}
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">
                        Email <span className="asterisk">*</span>{" "}
                    </label>
                    <input
                        defaultValue={email}
                        className="auth-input"
                        placeholder="Enter Email"
                        type="email"
                        required
                        onChange={handleEmailChange}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">
                        Password <span className="asterisk">*</span>{" "}
                    </label>
                    <input
                        defaultValue={password}
                        className="auth-input"
                        placeholder="Enter Password"
                        type="password"
                        required
                        onChange={handlePasswordChange}
                    />
                    {errors.password && (
                        <p className="error-text">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">
                        Confirm Password <span className="asterisk">*</span>{" "}
                    </label>
                    <input
                        defaultValue={confirmPassword}
                        className="auth-input"
                        placeholder="Confirm Password"
                        type="password"
                        required
                        onChange={handleConfirmPasswordChange}
                    />
                    {errors.confirmPassword && (
                        <p className="error-text">{errors.confirmPassword}</p>
                    )}
                </div>

                <div>
                    <button className="button btn-primary btn-login cursor">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
