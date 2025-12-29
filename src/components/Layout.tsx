import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on component mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);

    // Custom event for same-tab logout
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false);

    // Dispatch custom event for same-tab auth change
    window.dispatchEvent(new Event('authChange'));

    // Navigate to home page
    navigate('/');
  };

  const handleProtectedNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  };

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
            <Link
              to="/menu"
              style={{ color: 'black', textDecoration: 'none' }}
              onClick={(e) => handleProtectedNavigation(e)}
            >
              Menu
            </Link>
            <Link
              to="/stage1"
              style={{ color: 'black', textDecoration: 'none' }}
              onClick={(e) => handleProtectedNavigation(e)}
            >
              Bake
            </Link>
            <Link
              to="/gamestages"
              style={{ color: 'black', textDecoration: 'none' }}
              onClick={(e) => handleProtectedNavigation(e)}
            >
              Game Stages
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
                Login
              </Link>
            )}
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