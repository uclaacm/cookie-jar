import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { TOPPINGS } from "../data/toppings";
import { getCookie } from '../utils/getCookie';
import { monitorCookie } from '../utils/moniterCookie';

interface LayoutProps {
  children: ReactNode;
}

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh', // We still want the page to fill the viewport height
});

const ToolbarOffset = styled('div')({
  height: '64px', // default MUI AppBar height for desktop
  '@media (max-width:600px)': {
    height: '56px', // smaller screens
  },
});

/**
 * We remove the "display: flex" and "flexDirection: column" from here
 * so that the child pages (Home, Menu, etc.) can fully control their own layout.
 */
const Content = styled(Box)(({ /*theme*/ }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  // optional: remove or keep some padding
  // padding: theme.spacing(2),
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // If user completed Stage 3, customize header based on selected cookie topping
  const topping = Number(getCookie("topping"));
  const [headerColor, setHeaderColor] = useState(TOPPINGS[topping].color);

  const redrawHeader = (newTopping: string | null): void => {
    const topping = Number(newTopping);
    setHeaderColor(TOPPINGS[topping].color);
  }

  // Poll the cookie named topping every second
  // Change header color if the cookie changes
  monitorCookie("topping", redrawHeader);

  return (
    <Root>
      <CssBaseline />
      <AppBar id="header" style={{ backgroundColor: headerColor }} position="fixed">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {/* Left side of the AppBar */}
          <Link
            to="/"
            style={{
              color: 'black',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            Home
          </Link>

          {/* Right side of the AppBar */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/menu" style={{ color: 'black', textDecoration: 'none' }}>
              Menu
            </Link>
            <Link to="/stage1" style={{ color: 'black', textDecoration: 'none' }}>
              Bake
            </Link>
            <Link to="/gamestages" style={{ color: 'black', textDecoration: 'none' }}>
              Game Stages
            </Link>
            <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
              Login
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      {/* Offset so content doesn't hide behind the AppBar */}
      <ToolbarOffset />

      {/* Main content area: children have full layout control */}
      <Content>{children}</Content>
    </Root>
  );
};

export default Layout;