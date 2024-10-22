import React from 'react';
import '../styles/Home.scss';
import Button from '@mui/material/Button';

const Home: React.FC = () => {
    return ( 
        <div id="col-1">
            <h1 id="title">Cookie Jar</h1>
            <p id="description">
                What are web cookies? 
                What types of cookies are out there? 
                Are cookies safe?
                Let's embark on a delicious adventure to learn all about web cookies. Bon Appétit!            
            </p>
            <Button sx={{backgroundColor:'white', color: 'black', '&:hover': {backgroundColor: 'white'}}} size="large" variant="contained">Menu</Button>
        </div>
 );
    }

export default Home;