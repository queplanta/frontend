import React, { Component } from 'react';
import Helmet from 'react-helmet';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { 
  AppBar, Toolbar, Typography, Chip, Button, Tooltip,
  TextField, Container, Link, InputBase, Drawer, IconButton,
  MenuList, MenuItem, ListItemText, Hidden, withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import MenuIcon from '@material-ui/icons/Menu';
import { Link  as RouterLink } from 'found';
import { SnackbarProvider } from 'notistack';
import logoImg from './assets/queplanta-icon.svg';
import logoTextImg from './assets/queplanta-text-light.svg';
import AccountNavbar from './accounts/Navbar.js';
import AuthDialog from './accounts/AuthDialog.js';
import Footer from './Footer.js';
import headerNavBackground from './assets/background.jpg';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    }
  }

  handleDrawerToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  render() {
    const {classes, viewer} = this.props;
    const {drawerOpen} = this.state;

    return (<SnackbarProvider maxSnack={3}>
      <React.Fragment>
        <CssBaseline />
        <Helmet
          titleTemplate="%s | Que Planta"
          defaultTitle="Que Planta - Conectando Pessoas e Plantas"
        />
        <AuthDialog viewer={viewer}>
          <AppBar position="static" className={classes.appbar}>            
            <Toolbar className={classes.toolbar}>
              <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor="left"
                open={drawerOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <MenuList component="div" onClick={this.handleDrawerToggle}>
                  <MenuItem to="/" component={RouterLink} exact={true} activeClassName={classes.drawerListItemActive}>
                    <ListItemText primary="Início"/>
                  </MenuItem>
                  <MenuItem to="/plantas" component={RouterLink} activeClassName={classes.drawerListItemActive}>
                    <ListItemText primary="Plantas"/>
                  </MenuItem>
                  <MenuItem to="/identificacao" component={RouterLink} activeClassName={classes.drawerListItemActive}>
                    <ListItemText primary="Identificação"/>
                  </MenuItem>
                  <MenuItem to="/ocorrencias" component={RouterLink} activeClassName={classes.drawerListItemActive}>
                    <ListItemText primary="Ocorrências"/>
                  </MenuItem>
                </MenuList>
              </Drawer>
              <Hidden mdUp implementation="css">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                  edge="start"
                  className={clsx(classes.menuButton, drawerOpen && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Typography className={classes.title} component={RouterLink} to="/" noWrap>
                <img src={logoImg} alt="Que Planta" width="32" height="32" />
                <img src={logoTextImg} alt="Que Planta" height="22" />
              </Typography>
              <Hidden smDown implementation="css">
                <Chip label="em desenvolvimento" className={classes.chip} color="secondary"  variant="outlined" />
              </Hidden>
              <div className={classes.grow} />
              <AccountNavbar me={viewer.me} />
            </Toolbar>
            <Hidden smDown implementation="css">
              <nav className={classes.subnav}>      
                <Toolbar className={classes.toolbar}>
                  <Link activeClassName={classes.navlinkActive} exact={true} className={classes.navlink} to="/" component={RouterLink}>Início</Link>
                  <Link activeClassName={classes.navlinkActive} className={classes.navlink} to="/plantas" component={RouterLink}>Plantas</Link>
                  <Link activeClassName={classes.navlinkActive} className={classes.navlink} to="/identificacao" component={RouterLink}>Identificação</Link>
                  <Link activeClassName={classes.navlinkActive} className={classes.navlink} to="/ocorrencias" component={RouterLink}>Ocorrências</Link>
                  <div className={classes.grow} />
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Buscar..."
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </div>
                  <Tooltip title="Identificar por foto" placement="top">
                    <Button className={classes.btn} component={RouterLink} to="/identificacao/pedido"><CameraAltIcon /></Button>
                  </Tooltip>
                </Toolbar>
              </nav>
            </Hidden>
          </AppBar>

          {this.props.children}

          <Footer />
        </AuthDialog>
      </React.Fragment>
    </SnackbarProvider>);
  }
}

const drawerWidth = 240;

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  mb1: {
    marginBottom: 10,
  },
  chip: {
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  btn: {
    color: '#FFF',
    marginLeft: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 700,
    textDecoration: 'none',
    marginRight: 20,
    '& > img': {
      marginRight: 10,
      verticalAlign: 'middle',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  appbar: {
    color: '#FFFFFF',
    backgroundColor: '#047c4d',
    background: `url(${headerNavBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    boxShadow: 'none',
  },
  subnav: {
    backgroundColor: 'rgba(0,80,39,0.5)',
  },
  toolbar: {
    maxWidth: 1140,
    width: '100%',
    margin: '0 auto',
  },
  container: {
    padding: '60px 0',
  },
  navlink: {
    margin: '0',
    padding: '22px 20px',
    color: '#FFFF',
    "&:hover": {
      textDecoration: 'none',
      backgroundColor: '#FAFAFACC',
      color: '#005027',
    }
  },
  navlinkActive: {
    backgroundColor: '#FAFAFA',
    color: '#005027',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  textField: {
    margin: '0 auto',
    fontSize: '44px',
  },
  drawerListItemActive: {
    background: theme.palette.action.selected
  }
});

export default withStyles(styles)(App)
