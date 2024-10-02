import React, { useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SERVER_URL from '../../config/SERVER_URL';
import { AuthContext } from '../../context/AuthContext'; // Import the AuthContext

const Login = ({ onClose, createAccountPopupOpen }) => {
  const { login, isLoggedIn, logout } = useContext(AuthContext); // Use AuthContext
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${SERVER_URL}/login`, { username, password });
      const { data } = response;
      console.log(response);

      if (data.success) {
        toast.success(data.message); // Show success message
        // Assuming data contains user_id along with the success message
        const { user_id } = data; // Extract user_id from response
        login(username, user_id); // Call login from AuthContext with the username and user_id
        console.log(data)
      } else {
        toast.error('Login failed: ' + data.message); // Show error message
      }

    } catch (error) {
      toast.error('Error during login. Please try again.'); // Show error on catch
      console.error('Error during login:', error);
    }

    onClose();
  };

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    toast.info('Logged out successfully!'); // Show logout message
    onClose(); // Optionally close the popup on logout
  };

  return (
    <div className="login-overlay">
      <div className="login-popup">
        <button className="close-button" onClick={onClose}>×</button>
        {isLoggedIn ? (
          <>          
            <button className="logout-button" onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className='form'>
              <input 
                type="text" 
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value.trimStart())}
                required
              />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button type="submit" className='login-button'>Login</button>
            </form>
            <br />
            <div className="signup-section">
              <p>Don't have an account?
              <button className="create-account-button" onClick={() => { onClose(); createAccountPopupOpen(); }}>Create Account</button></p>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
