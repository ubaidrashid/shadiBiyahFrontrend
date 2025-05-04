import "../Signup/signup.css";
// import axios from "axios";
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const Submit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            alert("Please fill all the fields");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // After successful signup, save user details and token to localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token); // Save JWT token
                console.log("Signup successful", data);

                // Redirect to login page
                window.location.replace("/login");
            } else {
                console.error("Error during signup", data.message || data.error);
            }
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        const token = credentialResponse.credential;  // Google ID token

        try {
            const response = await fetch("http://localhost:5000/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Required header for JSON request
                },
                body: JSON.stringify({ token }), // Send token in JSON format
            });

            const data = await response.json();

            // Handle response
            if (response.ok) {
                console.log("Google login successful", data);

                console.log("User Data to be saved in LocalStorage: ", data.user);
                console.log("JWT Token to be saved in LocalStorage: ", data.token);

                // Setting the data
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);

                // Save user and token to localStorage
                localStorage.setItem("user", JSON.stringify(data.email));
                localStorage.setItem("token", data.token); // Save JWT token
                console.log(data , "==========data");

                // Redirect to home/dashboard after successful login
                window.location.replace("/home");
            } else {
                console.error("Error logging in with Google", data.message || data.error);
            }
        } catch (error) {
            console.error("Error logging in with Google", error);
        }
    };


    return (
        <div className="form">
            <h1>Sign Up</h1>
            <form onSubmit={Submit}>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="signUpBtn" type="submit">Sign Up</button>
            </form>

            <div className="googleLogin">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        handleGoogleLogin(credentialResponse);
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                />
            </div>

            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default SignUp;
