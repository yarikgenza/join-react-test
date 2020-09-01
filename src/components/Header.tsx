import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

export default function Header() {
  const classes = useStyles();

  return (
      <AppBar position="static" className={classes.root}>
          <NavLink exact to="/apply" className={classes.navLink}>
            <Typography variant="h6" className={classes.navTitle}>
              Apply
            </Typography>
          </NavLink>
          <NavLink exact to="/candidates" className={classes.navLink}>
            <Typography variant="h6" className={classes.navTitle}>
              Candidates
            </Typography>
          </NavLink>
      </AppBar>
  );
}

const useStyles = makeStyles((_theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  navLink: {
    color: '#d6d6d6',
    textDecoration: 'none',
    '&.active': {
      color: 'white',
    },
  },
  navTitle: {
    flexGrow: 1,
    margin: 15,
    textDecoration: 'none',
  },
}));