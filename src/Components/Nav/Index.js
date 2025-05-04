import "../Nav/nav.css";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../../assets/images/sblogo.png";
import { useEffect, useState } from "react";
const Nav = ({ user }) => {
    // const userData = JSON.parse(localStorage.getItem("user"));
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const getuserData = JSON.parse(localStorage.getItem("user") || "null");
        setUserData(getuserData);

        console.log(getuserData, "userData");
    }, []); // ✅ safe and warning ko ignore karo


    const LogoutHandler = async () => {

        try {
            await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userData?.email }),
            });

            localStorage.removeItem("user");
            window.location.replace("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    if (userData) {
        console.log("haiga")
    }
    return (
        <div className="nav">
            <div className="logo">
                <img src={logo} alt="" />
                <h1>Shaadi Biyaah</h1>
            </div>
            <div className="ul">
                <li>
                    <Link
                        to={user ? "/home" : "#"}
                        onClick={(e) => {
                            if (!user) {
                                e.preventDefault();
                                alert("Please login to access this page.");
                            }
                        }}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/halls">Halls</Link>
                </li>

                {user ? (
                    <li onClick={LogoutHandler}>Logout</li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">SignUp</Link>
                        </li>
                    </>
                )}
                {userData && (
                    <div className="userLogo" style={{ textTransform: "uppercase" }}>
                        {typeof userData === "string"
                            ? userData[0]
                            : userData.email?.[0]}
                    </div>
                )}
            </div>
        </div>

    )
}

export default Nav;