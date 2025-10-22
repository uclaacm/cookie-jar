import '../styles/Home.scss';
import '../styles/App.scss';
import '../styles/Login.scss'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      
      // Navigate to home page or dashboard
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className='login'>
      <h1><b>Log In</b></h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginTop: "20px" }}
          required
        />
  
      <div className="password-container">
        <input 
          type={"password"} 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
        {error && <p className="error">{error}</p>}
        <Button type="submit" className='login-button'>Login</Button>
      </form>
    </div>
  );
};

export default Login;