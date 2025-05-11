import { useState } from "react";
import "../Login/login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            localStorage.setItem("user", JSON.stringify(data.user));
            console.log("Login successful", data.user);
            localStorage.setItem("token", data.token);
            console.log("Token saved", data.token);
            window.location.replace("/home");
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return (
        <div className="loginForm">
            <h1 className="loginHead">Login</h1>
            <form onSubmit={loginHandler} className="loginform">
                <label htmlFor="email">Email</label>
                <input
                    className="logininputs"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    className="logininputs"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="loginBtn" type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
};

export default Login;
