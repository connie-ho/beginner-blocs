import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar } from '@mui/material';

import logo from '../assets/logo.jpg';

const useStyles = makeStyles(theme => ({
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
      alignItems: 'center'
    }

  })
);

const Nav = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <div className={classes.linkContainer}>
          <NavLink className={classes.logoContainer} to="/">
            <img
              alt="logo"
              className={classes.logo}
              src={logo}
              />
            <h2 className={classes.link}>Beginner Blocs</h2>
          </NavLink>
        </div>
        <NavLink className={classes.link} to="/login">
          Login
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
