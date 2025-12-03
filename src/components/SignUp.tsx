import '../styles/Home.scss';
import '../styles/App.scss';
import '../styles/SignUp.scss'
import '../styles/Login.scss'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Store the token in localStorage
      localStorage.setItem('token', data.token);

      // Dispatch custom event to update auth state in navbar
      window.dispatchEvent(new Event('authChange'));

      // Navigate to home page or dashboard
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className='signup'>
      <h1> Sign Up to Start Baking! </h1>
      <form onSubmit={handleSubmit}>
        <p> First Name </p>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <p> Last Name </p>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <p> Email </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p> Password </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <Button type="submit" className='signup-button'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;