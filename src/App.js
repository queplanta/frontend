import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, Toolbar, Typography, Chip, withStyles } from '@material-ui/core';
import { Link } from 'found';
import { SnackbarProvider } from 'notistack';
import logoImg from './assets/logo-queplanta-32px.png';
import AccountNavbar from './accounts/Navbar.js';
import AuthDialog from './accounts/AuthDialog.js';
import Footer from './Footer.js';

export class App extends Component {
  render() {
    const {classes, viewer} = this.props;
    return (
      <SnackbarProvider maxSnack={3}>
        <React.Fragment>
          <CssBaseline />
          <AuthDialog viewer={viewer}>
            <AppBar position="static" color="default">
              <Toolbar className={classes.toolbar}>
                <Typography className={classes.title} component={Link} to="/" noWrap>
                  <img src={logoImg} alt="Que Planta" />
                  Que Planta
                </Typography>
                <Chip label="em desenvolvimento" className={classes.chip} color="secondary"  variant="outlined" />
                <div className={classes.grow} />
                <AccountNavbar me={viewer.me} />
              </Toolbar>
            </AppBar>

            {this.props.children}

            <Footer />
          </AuthDialog>
        </React.Fragment>
      </SnackbarProvider>
    );
  }
}

const styles = {
  grow: {
    flexGrow: 1,
  },
  title: {
    color: '#005027',
    fontSize: 18,
    fontWeight: 700,
    textDecoration: 'none',
    marginRight: 20,
    '& > img': {
      marginRight: 10,
      verticalAlign: 'middle',
    },
  },
  toolbar: {
    maxWidth: 1140,
    width: '100%',
    margin: '0 auto',
  }
}

export default withStyles(styles)(App)
