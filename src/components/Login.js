import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [error, setError] = useState(''); // For displaying error messages
    const [success, setSuccess] = useState(''); // For displaying success messages
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
  
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        });
  
        if (response.data) {
          setSuccess('Login successful!');
          console.log('Logged in user:', response.data);
  
          // Optionally, save the token in localStorage
          localStorage.setItem('token', response.data.token);
  
          // Redirect to a dashboard or another page
          // window.location.href = '/dashboard';
        }
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Login failed');
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    };
  

    return (
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <Link to="/forgot-password">Forgot Password?</Link>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    );
  };

  export default Login;