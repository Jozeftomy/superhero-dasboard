import React, { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
    let navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const usernameRef = useRef();

    const Submit = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": usernameRef.current.value,
            "email": emailRef.current.value,
            "password": passwordRef.current.value,
            "phone": phoneRef.current.value
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:4000/admin/signup", requestOptions)
        .then((response) => response.json())
        .then((result) =>{
            if(result.data){
                console.log("Signup Successful:", result.data);
                alert('Registration successful');

                // Store token after signup
                if (result.token) {
                    localStorage.setItem("token", result.token);
                }

                navigate('/login');
            } else {
                alert('Failed to register');
            }
        })
        .catch((error) => console.error("Signup Error:", error));     
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1 className="signup-title">Sign Up</h1>
                <div className="input-group">
                    <label>Username</label>
                    <input type="text" ref={usernameRef} required className="signup-input"/>
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" ref={emailRef} required className="signup-input"/>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} required className="signup-input"/>
                </div>
                <div className="input-group">
                    <label>Phone</label>
                    <input type="text" ref={phoneRef} required className="signup-input"/>
                </div>
                <button onClick={Submit} className="signup-button">Sign Up</button>
                <p>Already have an account?</p>
                <Link to="/login" className="login-option">Login</Link> 
            </div>
        </div>
    );
}

export default SignUp;