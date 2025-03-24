'use client';

import "./style.css";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { useAuth } from '../context/AuthContext';
import Alert from '../Alert';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, alert, showAlert } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="login-box container mt-5">
            <p>Login</p>
            
            {alert && (
              <div className="mb-4">
                <Alert 
                  alert={alert} 
                  onClose={() => showAlert(null)}
                />
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input 
                        required 
                        name="email" 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                    />
                    <label>Email</label>
                </div>
                <div className="user-box password-container">
                    <input
                        required
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                    />
                    <label>Password</label>
                    <span className="password-toggle" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />} 
                    </span>
                </div>
                <div className="btn"></div>
                <button type="submit" className="submit-button btn btn-primary w-100">
                    Submit
                </button>
            </form>
            <p className="mt-3">Don't have an account? <Link href="/signup" className="a2">Sign up!</Link></p>
        </div>
    );
}