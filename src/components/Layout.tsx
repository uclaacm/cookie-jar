import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

// Define type for LayoutProps to accept children
interface LayoutProps {
  children: ReactNode;
}

// Define styled components
const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh', // Full viewport height
});

const ToolbarOffset = styled('div')({
    height: '64px', // larger screens
    '@media (max-width:600px)': {
      height: '56px', // AppBar height for smaller screens
    },
  });

const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Root>
        <CssBaseline />
        <AppBar style={{ backgroundColor: '#ffc107' }} position="fixed">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link to="/menu" style={{ color: 'white', textDecoration: 'none' }}>Menu</Link>
                    <Link to="/shop" style={{ color: 'white', textDecoration: 'none' }}>Shop</Link>
                    <Link to="/bake" style={{ color: 'white', textDecoration: 'none' }}>Bake</Link>
                </div>
            </Toolbar>
        </AppBar>
        <ToolbarOffset /> {/* Spacer to prevent overlap */}
        <Content>
            {children} {/* Renders the route content */}
        </Content>
    </Root>
  );
};

export default Layout;