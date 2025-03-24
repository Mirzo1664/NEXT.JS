'use client';

import "./style.css";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { useAuth } from '../context/AuthContext';
import Alert from '../Alert';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, alert, showAlert } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(username, email, password);
    };

    return (
        <div className="login-box container mt-5">
            <p>Sign Up</p>
            
            {/* Bootstrap Alert */}
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
                        name="username" 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                    />
                    <label>User Name</label>
                </div>
                <div className="user-box">
                    <input 
                        required 
                        name="email" 
                        type="email" 
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
                        minLength="6"
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
            <p className="mt-3">Already have an account? <Link href="/login" className="a2">Login</Link></p>
        </div>
    );
}