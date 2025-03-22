'use client';

import "./style.css";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); 
    };

    return (
        <div className="login-box">
            <p>Sign Up</p>
            <form>
              
            <div className="user-box">
                    <input required name="email" type="text" />
                    <label>User Name</label>
                </div>
                <div className="user-box">
                    <input required name="email" type="text" />
                    <label>Email</label>
                </div>
                <div className="user-box password-container">
                    <input
                        required
                        name="password"
                        type={showPassword ? "text" : "password"} 
                    />
                    <label>Password</label>
                    <span className="password-toggle" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />} 
                    </span>
                </div>
                <div className="btn"></div>
                <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </a>
            </form>
            <p>Don't have an account? <Link href="/login" className="a2">Login</Link></p>
        </div>
    );
}