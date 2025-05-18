import "../Signup/signup.css";
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
            const response = await fetch(`https://shadi.up.railway.app/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const text = await response.text();
            console.log("Response text:", text);

            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                console.error("Failed to parse JSON:", err);
            }


            if (response.ok) {
                console.log("Signup successful", data);
                window.location.replace("/login");
            } else {
                console.error("Error during signup", data.message || data.error);
            }
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        const token = credentialResponse.credential;
                console.log("credentialResponse:", credentialResponse);
                console.log("credential token:", credentialResponse?.credential);
                
                try {
                    const response = await fetch("https://shadi.up.railway.app/api/auth/google/callback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Google signup/login successful", data);
                console.log("Google token: ", token);
                localStorage.setItem("token", JSON.stringify(data.token)); // or whatever key your backend returns
                localStorage.setItem("user", JSON.stringify(data.email)); // or whatever key your backend returns
                console.log("token:", token);

                window.location.replace("/home"); // Only redirect, no localStorage


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
