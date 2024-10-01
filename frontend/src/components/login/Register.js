import React, { useState } from 'react';
import './Register.css';  // Updated the CSS file name

const Register = ({ onClose, loginPopupOpen }) => {
    
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            fullName,
            dateOfBirth,
            username,
            email,
            password,
            confirmPassword
        });

        onClose();
    };

    return (
        <div className='register-overlay'>
            <div className='register-popup'>
                <button className='register-close-button' onClick={onClose}>×</button>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value.trimStart())}
                        onBlur={() => setFullName(fullName.trim())}
                    />
                    <input
                        type="date"
                        placeholder="Date of birth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.trimStart())}
                        onBlur={() => setUsername(username.trim())}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className='register-button' type="submit">Register</button>  
                </form>
                <div className='register-signup-section'>
                    <p>Already have an account?</p>
                    <button className='register-login-button' onClick={() => { onClose(); loginPopupOpen(); }}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
