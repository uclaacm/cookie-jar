import React from 'react';
import { Button, Container, Link, Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const SignIn: React.FC = () => {
  
  const handleSubmit = () => console.log('login')
  return(
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Typography component='h1' variant="h5" sx={{ textAlign: "center" }}>
          Sign In
        </Typography> 
        <Box 
          component='form' 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ mt: 1 }}
        >
          <TextField 
            label='Username'
            placeholder="Enter username" 
            fullWidth 
            required 
            autoFocus 
            sx={{ mb: 2 }}
          />
          <TextField 
            label='Password'
            placeholder="Enter password" 
            fullWidth 
            required 
            type='password' 
            sx={{ mb: 2 }}
          />
          <Button 
            type="submit" 
            color='primary' 
            variant="contained"
            fullWidth 
            sx={{ mt: 1, mb: 2 }}>
            Sign In 
          </Button>
          </Box>
        <Typography>  
          <Link href="#">
          Don't have an account? Sign up here.
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignIn;