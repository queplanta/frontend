import React, { Component } from 'react';
import Route from 'found/lib/Route';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, Toolbar, Typography, Chip, withStyles } from '@material-ui/core';
import { Link } from 'found';
import AppQuery from './App.query.js';
import logoImg from './assets/logo-queplanta-32px.png';
import AccountNavbar from './accounts/Navbar.js'
import AuthDialog from './accounts/AuthDialog.js'

class App extends Component {
  render() {
    const {classes, viewer} = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AuthDialog>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} component={Link} to="/" noWrap>
                <img src={logoImg} alt="Que Planta" />
                Que Planta
              </Typography>
              <Chip label="em desenvolvimento" className={classes.chip} color="secondary" />
              <div className={classes.grow} />

              <AccountNavbar me={viewer.me} />
            </Toolbar>
          </AppBar>

          {this.props.children}
        </AuthDialog>
      </React.Fragment>
    );
  }
}

const styles = {
  grow: {
    flexGrow: 1,
  }
}

export const appRoute = <Route
	path="/"
	Component={withStyles(styles)(App)}
	query={AppQuery}
/>
