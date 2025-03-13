import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; 
import LoadingScreen from "../components/ScreenLoader"; 
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
    let navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false); 

    const Submit = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        console.log(email, password);
        setLoading(true); 

        try {
            const response = await fetch("http://localhost:4000/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const result = await response.json();

            if (result.token) {
                localStorage.setItem("token", result.token);
                alert("Login successful");
                setIsAuthenticated(true);
                navigate('/dashboard');
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {loading && <LoadingScreen />} 
            
            <div className="login-box">
                <h1 className="login-title">Login</h1>
                <div className="input-group">
                    <label>Email</label>
                    <input type="text" ref={emailRef} required className="login-input" />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} required className="login-input" />
                </div>
                <button onClick={Submit} className="login-button" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p>Don't have an account?</p>
                <Link to="/signup" className="signup-option">Sign Up</Link> 
            </div>
        </div>
    );
};

export default Login;
