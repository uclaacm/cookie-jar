import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function TopAppBar(): JSX.Element {
    const nav = useNavigate();

    return (
        <AppBar style={{backgroundColor: '#ffc107'}} position='fixed'>
            <Toolbar>
                <Button color='inherit' onClick={() => nav('/')}> Cookie Jar </Button>
                <Box sx={{ flexGrow: 1}} />
                <Button color='inherit' onClick={() => nav('/bake')}> Bake </Button>
                <Button color='inherit' onClick={() => nav('/menu')}> Menu </Button>
                <Button color='inherit' onClick={() => nav('/shop')}> Shop </Button>
            </Toolbar>
        </AppBar>
    );
}

export default TopAppBar;