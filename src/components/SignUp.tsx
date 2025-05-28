import React,  { useState, useEffect } from 'react';
import '../styles/Home.scss';
import '../styles/App.scss';
import '../styles/SignUp.scss'
import '../styles/Login.scss'
import Button from '@mui/material/Button';


const SignUp: React.FC = () => {
  return (
    <div className='signup'>
      <h1> Sign Up to Start Baking! </h1>
      <p> Email </p>
      <input type="email"></input>
      <p> Password </p>
      <input type="password"></input>
      <Button className='signup-button'>Sign Up</Button>
    </div>
  );
};

export default SignUp;