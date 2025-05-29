import '../styles/Home.scss';
import '../styles/App.scss';
import '../styles/Login.scss'
import Button from '@mui/material/Button';


const Login: React.FC = () => {
  return (
    <div className='login'>
      <h1> Login to Start Baking! </h1>
      <p> Email </p>
      <input type="email"></input>
      <p> Password </p>
      <input type="password"></input>
      <Button className='login-button'>Login</Button>
    </div>
  );
};

export default Login;