'use client';

import "./style.css";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { useAuth } from '../context/AuthContext';
import Alert from '../Alert';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const { signup, alert, showAlert } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData.username, formData.email, formData.password);
    };

    return (
        <div className="login-box-signup container mt-5">
            <p>Sign Up</p>
            
            {alert && (
                <div className="mb-4">
                    <Alert 
                        alert={alert} 
                        onClose={() => showAlert(null)}
                    />
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="main">
                    <input 
                        required 
                        name="username" 
                        type="text" 
                        className="input"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <label>
                        <span style={{transitionDelay: "0ms", left: "0px"}}>U</span>
                        <span style={{transitionDelay: "50ms", left: "15px"}}>s</span>
                        <span style={{transitionDelay: "100ms", left: "30px"}}>e</span>
                        <span style={{transitionDelay: "150ms", left: "45px"}}>r</span>
                        <span style={{transitionDelay: "200ms", left: "60px"}}>n</span>
                        <span style={{transitionDelay: "250ms", left: "75px"}}>a</span>
                        <span style={{transitionDelay: "300ms", left: "90px"}}>m</span>
                        <span style={{transitionDelay: "350ms", left: "115px"}}>e</span>
                        <p style={{
                            position: "absolute",
                            left: "-8px",
                            top: "-10px",
                            fontSize: "24px",
                            margin: "10px",
                            color: "gray",
                            transition: "0.5s",
                            pointerEvents: "none"
                        }}>Username</p>
                    </label>
                </div>

                <div className="main">
                    <input 
                        required 
                        name="email" 
                        type="email" 
                        className="input"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label>
                        <span style={{transitionDelay: "0ms", left: "0px"}}>E</span>
                        <span style={{transitionDelay: "50ms", left: "15px"}}>m</span>
                        <span style={{transitionDelay: "100ms", left: "35px"}}>a</span>
                        <span style={{transitionDelay: "150ms", left: "50px"}}>i</span>
                        <span style={{transitionDelay: "200ms", left: "60px"}}>l</span>
                        <p style={{
                            position: "absolute",
                            left: "-8px",
                            top: "-10px",
                            fontSize: "24px",
                            margin: "10px",
                            color: "gray",
                            transition: "0.5s",
                            pointerEvents: "none"
                        }}>Email</p>
                    </label>
                </div>
                
                <div className="main password-container">
                    <input
                        required
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="input"
                        value={formData.password}
                        onChange={handleChange}
                        minLength="6"
                    />
                    <label>
                        <span style={{transitionDelay: "0ms", left: "0px"}}>P</span>
                        <span style={{transitionDelay: "50ms", left: "15px"}}>a</span>
                        <span style={{transitionDelay: "100ms", left: "30px"}}>s</span>
                        <span style={{transitionDelay: "150ms", left: "45px"}}>s</span>
                        <span style={{transitionDelay: "200ms", left: "60px"}}>w</span>
                        <span style={{transitionDelay: "250ms", left: "80px"}}>o</span>
                        <span style={{transitionDelay: "300ms", left: "95px"}}>r</span>
                        <span style={{transitionDelay: "350ms", left: "110px"}}>d</span>
                        <p style={{
                            position: "absolute",
                            left: "-8px",
                            top: "-10px",
                            fontSize: "24px",
                            margin: "10px",
                            color: "gray",
                            transition: "0.5s",
                            pointerEvents: "none"
                        }}>Password</p>
                    </label>
                    <span 
                        className="password-toggle" 
                        onClick={togglePasswordVisibility}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && togglePasswordVisibility()}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />} 
                    </span>
                </div>
                <button type="submit" className="submit-button btn btn-primary w-100 mt-3">
                    Sign Up
                </button>
            </form>
            <p className="hph mt-3">
                Already have an account? <Link href="/login" className="a2">Login</Link>
            </p>
        </div>
    );
}