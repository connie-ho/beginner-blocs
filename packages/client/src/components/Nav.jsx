import React, { useContext } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import NavButton from './common/NavButton';
import logo from '../assets/logo.jpg';
import img from '../assets/default.png';
import { UserContext } from '../contexts/user-context';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'space-between',
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 0, 2),
  },
  link: {
    textDecoration: 'none',
    fontWeight: 700,
    color: 'white',
    fontSize: theme.typography.pxToRem(20),
    padding: theme.spacing(0, 2),
  },
  logo: {
    width: theme.typography.pxToRem(50),
  },
  logoContainer: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
}));

const settings = [
  { name: 'Profile', link: '/Profile' },
  { name: 'Logout', link: '/' },
];

const Nav = () => {
  const classes = useStyles();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { account, connectWallet, disconnectWallet } = useContext(UserContext);
  let navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = async (setting) => {
    if (setting.name === 'Logout') {
      await disconnectWallet();
      navigate(setting.link);
    } else {
      navigate(setting.link);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <div className={classes.linkContainer}>
          <NavLink className={classes.logoContainer} to="/">
            <img alt="logo" className={classes.logo} src={logo} />
            <h2 className={classes.link}>Beginner Blocs</h2>
          </NavLink>
          <NavLink className={classes.logoContainer} to="/FAQ">
            <h2 className={classes.link}>FAQ</h2>
          </NavLink>
          <NavLink className={classes.logoContainer} to="/create">
            <h2 className={classes.link}>Create</h2>
          </NavLink>
        </div>
        {account ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="profile" src={img} />
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
              {settings.map((setting) => (
                <MenuItem key={`nav-${setting.name}`} onClick={handleCloseUserMenu}>
                  <Typography onClick={() => handleProfileClick(setting)} textAlign="center">
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <NavButton onClick={connectWallet}>Login</NavButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
