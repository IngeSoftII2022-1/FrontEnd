import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {Modal} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { AccountCircle, Logout, Map } from "@mui/icons-material";
import { LoginForm, SignupForm } from "../auth";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '20ch',
    '&:focus': {
      width: '25ch',
    }
  },
}));

const pages = ['login','signup'];
const settings = ['profile', 'Logout'];

const ResponsiveAppBar = () => {
  const { user, logout } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modal, setModal] = useState(false);
	const location = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseNavMenuLogin = () => {
    navigate("/users/login")
    setAnchorElNav(null);
  };

  const handleCloseNavMenuSignup = () => {
    navigate("/users/signup")
    setAnchorElNav(null)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

	useEffect(() => {
		setModal(!user && location.hash.replace("#", ""));
	}, [user, location]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DirectionsCarIcon sx={{mr: 1 ,display: { xs: 'none', md: 'flex' }}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SPARKING
          </Typography>

          <DirectionsCarIcon sx={{mr: 1 , display: { xs: 'flex', md: 'none' }}} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SPARKING
          </Typography>

          <Search sx={{display: {md: 'flex' }}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {user ? (
              <>
                <Box sx={{ flexGrow: 0, ml:2}}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} >
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem key="profile" onClick={() => navigate("/users/profile")}>
                      <AccountCircle />
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem key="Logout" onClick={() => logout() && navigate("/home")}>
                      <Logout />
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    key='login'
                    onClick={() => navigate("#login")}
                    sx={{ my: 2, ml:2, color: 'white', display: 'block' }}
                  >
                    login
                  </Button>

                  <Button
                    key='signup'
                    onClick={() => navigate("#signup")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    signup
                  </Button>

                </Box>
                <Box sx={{ flexGrow: 0, display: {xs: 'flex',md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    <MenuItem key='login' onClick={() => navigate("#login")}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                    <MenuItem key='signup' onClick={() => navigate("#signup")}>
                      <Typography textAlign="center">Signup</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
          )}

          <Modal
				    open={modal === "login" || modal === "signup"}
				    onClose={() => navigate("#")}
			    >
				    <Box maxWidth="sm" margin="auto" marginTop="2rem">
					    {modal === "login" && <LoginForm />}
					    {modal === "signup" && <SignupForm />}
				    </Box>
			    </Modal>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
