import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
  
    const handleForgotPassword = (e) => {
      e.preventDefault();
      // Add forgot password logic here
      console.log('Password reset link sent to:', email);
    };
  
    return (
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    );
  };

  export default ForgotPassword;