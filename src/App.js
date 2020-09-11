import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { IntlProvider } from "react-intl";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  AppBar,
  Breadcrumbs,
  Toolbar,
  Typography,
  Chip,
  Button,
  Tooltip,
  Divider,
  Link,
  InputBase,
  Drawer,
  IconButton,
  MenuList,
  MenuItem,
  ListItemText,
  Hidden,
  withStyles,
} from "@material-ui/core";
import { ThemeProvider, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link as RouterLink, withRouter } from "found";
import { SnackbarProvider } from "notistack";
import { ThroughProvider } from "react-through";
import { Breadcrumbs as BreadcrumbsDynamic } from "react-breadcrumbs-dynamic";
import PageviewTracking from "./lib/PageviewTracking";
import theme from "./theme.js";
import logoImg from "./assets/queplanta-icon.svg";
import logoTextImg from "./assets/queplanta-text-light.svg";
import AccountNavbar from "./accounts/Navbar.js";
import Footer from "./Footer.js";
import { Width } from "./ui";
import BottomNavbar from "./BottomNavbar.js";
import headerNavBackground from "./assets/background.jpg";
import { LoginRequiredProvider } from "./accounts/LoginRequired.js";
import Jumbotron from "./Jumbotron.js";

import "./index.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      searchBy: "",
      appbarPosition: "static",
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  handleDrawerToggle() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  onChangeSearch(e) {
    this.setState({ searchBy: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.router.push(`/plantas?q=${this.state.searchBy}`);
  }

  render() {
    const { classes, viewer } = this.props;
    const { drawerOpen, appbarPosition } = this.state;
    const { pathname } = this.props.match.location;

    const plantUrlTest = /^\/[-\w]+-p\d+\/?/;

    const isPlantsRoute = plantUrlTest.test(pathname);
    const isHomeRoute = pathname === "/";

    return (
      <IntlProvider locale="pt-BR">
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <LoginRequiredProvider viewer={viewer}>
              <ThroughProvider>
                <PageviewTracking>
                  <CssBaseline />
                  <Helmet
                    titleTemplate="%s | Que Planta"
                    defaultTitle="Que Planta - Conectando Pessoas e Plantas"
                  />
                  <AppBar
                    position={appbarPosition}
                    className={clsx(classes.bgNv, classes.appbar)}
                  >
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
                        <MenuList
                          component="div"
                          onClick={this.handleDrawerToggle}
                        >
                          <MenuItem
                            to="/"
                            component={RouterLink}
                            exact={true}
                            activeClassName={classes.drawerListItemActive}
                          >
                            <ListItemText primary="Início" />
                          </MenuItem>
                          <MenuItem
                            to="/plantas"
                            selected={isPlantsRoute}
                            component={RouterLink}
                            activeClassName={classes.drawerListItemActive}
                          >
                            <ListItemText primary="Plantas" />
                          </MenuItem>
                          <MenuItem
                            to="/mapa"
                            component={RouterLink}
                            activeClassName={classes.drawerListItemActive}
                          >
                            <ListItemText primary="Mapa" />
                          </MenuItem>
                          <MenuItem
                            to="/identificacao"
                            component={RouterLink}
                            activeClassName={classes.drawerListItemActive}
                          >
                            <ListItemText primary="Identificação" />
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            to="/o-que-e"
                            component={RouterLink}
                            activeClassName={classes.drawerListItemActive}
                          >
                            <ListItemText primary="O que é" />
                          </MenuItem>
                          <MenuItem
                            to="/como-funciona"
                            component={RouterLink}
                            activeClassName={classes.drawerListItemActive}
                          >
                            <ListItemText primary="Como Funciona" />
                          </MenuItem>
                          <MenuItem
                            to="/contribua"
                            component={RouterLink}
                            activeClassName={classes.drawerListItemActive}
                          >
                            <ListItemText primary="Contribua" />
                          </MenuItem>
                          <MenuItem
                            to="/blog"
                            component={RouterLink}
                            activeClassName={classes.drawerListItemActive}
                          >
                            <ListItemText primary="Blog" />
                          </MenuItem>
                        </MenuList>
                      </Drawer>
                      {!isHomeRoute && (
                        <Hidden mdUp implementation="css">
                          <IconButton
                            aria-label="back"
                            edge="start"
                            className={classes.backButton}
                            onClick={() =>
                              window.history.length
                                ? window.history.go(-1)
                                : this.props.router.push("/")
                            }
                          >
                            <ArrowBackIcon />
                          </IconButton>
                        </Hidden>
                      )}
                      <Typography
                        className={classes.title}
                        component={RouterLink}
                        to="/"
                        noWrap
                      >
                        <img
                          src={logoImg}
                          alt="Que Planta"
                          width="32"
                          height="32"
                        />
                        <img src={logoTextImg} alt="Que Planta" height="22" />
                      </Typography>
                      <Hidden smDown implementation="css">
                        <Chip
                          label="em desenvolvimento"
                          className={classes.chip}
                          color="secondary"
                          variant="outlined"
                        />
                      </Hidden>
                      <div className={classes.grow} />
                      <Hidden smDown implementation="css">
                        <AccountNavbar me={viewer.me} />
                      </Hidden>
                      <Hidden mdUp implementation="css">
                        <IconButton
                          color="inherit"
                          aria-label="open drawer"
                          onClick={this.handleDrawerToggle}
                          edge="start"
                          className={clsx(
                            classes.menuButton,
                            drawerOpen && classes.hide
                          )}
                        >
                          <MenuIcon />
                        </IconButton>
                      </Hidden>
                    </Toolbar>

                    <Hidden smDown implementation="css">
                      {(!viewer.me || !viewer.me.isAuthenticated) &&
                        isHomeRoute && <Jumbotron />}
                    </Hidden>

                    <Hidden smDown implementation="css">
                      <nav className={classes.subnav}>
                        <Toolbar className={classes.toolbar}>
                          <Link
                            activeClassName={classes.navlinkActive}
                            className={classes.navlink}
                            to="/"
                            component={RouterLink}
                            exact={true}
                          >
                            Início
                          </Link>
                          <Link
                            activeClassName={classes.navlinkActive}
                            className={clsx(classes.navlink, {
                              [classes.navlinkActive]: isPlantsRoute,
                            })}
                            to="/plantas"
                            component={RouterLink}
                          >
                            Plantas
                          </Link>
                          <Link
                            activeClassName={classes.navlinkActive}
                            className={classes.navlink}
                            to="/mapa"
                            component={RouterLink}
                          >
                            Mapa
                          </Link>
                          <Link
                            activeClassName={classes.navlinkActive}
                            className={classes.navlink}
                            to="/identificacao"
                            component={RouterLink}
                          >
                            Identificação
                          </Link>
                          <div className={classes.grow} />
                          <form
                            className={classes.search}
                            onSubmit={this.handleSearch}
                          >
                            <div className={classes.searchIcon}>
                              <SearchIcon />
                            </div>
                            <InputBase
                              placeholder="Buscar..."
                              classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                              }}
                              inputProps={{ "aria-label": "search" }}
                              value={this.state.searchBy}
                              onChange={this.onChangeSearch}
                            />
                          </form>
                          <Tooltip title="Identificar por foto" placement="top">
                            <Button
                              className={classes.btn}
                              component={RouterLink}
                              to="/adicionar"
                            >
                              <CameraAltIcon />
                            </Button>
                          </Tooltip>
                        </Toolbar>
                      </nav>
                    </Hidden>
                  </AppBar>
                  <div className={classes.pagelet}>
                    <Hidden mdUp implementation="css">
                      {(!viewer.me || !viewer.me.isAuthenticated) &&
                        isHomeRoute && (
                          <Jumbotron
                            className={clsx(classes.bgNv, classes.jumbotron)}
                          />
                        )}
                    </Hidden>
                    <div className={classes.breadcrumbs}>
                      <BreadcrumbsDynamic
                        hideIfEmpty={true}
                        item={RouterLink}
                        finalItem={"b"}
                        container={Breadcrumbs}
                      />
                    </div>
                    {this.props.children}
                  </div>
                  <Hidden smDown implementation="css">
                    <Footer />
                  </Hidden>
                  <Hidden mdUp implementation="css">
                    <BottomNavbar viewer={viewer} />
                  </Hidden>
                </PageviewTracking>
              </ThroughProvider>
            </LoginRequiredProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </IntlProvider>
    );
  }

  updateDimensions() {
    this.setState({
      appbarPosition: window.innerWidth <= 600 ? "fixed" : "static",
    });
  }

  componentDidMount() {
    if (window.innerWidth <= 600) {
      this.setState({ appbarPosition: "fixed" });
    }
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}

const drawerWidth = 240;

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  mb1: {
    marginBottom: 10,
  },
  chip: {
    color: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  btn: {
    color: "#FFF",
    marginLeft: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 700,
    textDecoration: "none",
    marginRight: 20,
    "& > img": {
      marginRight: 10,
      verticalAlign: "middle",
    },
  },
  pagelet: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: 56,
      paddingBottom: 56,
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  appbar: {},
  bgNv: {
    color: "#FFFFFF",
    backgroundColor: "#047c4d",
    backgroundImage: `url(${headerNavBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 0",
    boxShadow: "0 1px rgba(255,255,255,0.1)",
  },
  jumbotron: {
    paddingTop: 32,
    paddingBottom: 32,
    backgroundPosition: "0 -56px !important",
  },
  subnav: {
    backgroundColor: "rgba(0,80,39,0.5)",
  },
  toolbar: {
    maxWidth: 1140,
    width: "100%",
    margin: "0 auto",
    height: 56,
  },
  container: {
    padding: "60px 0",
  },
  navlink: {
    margin: "0",
    padding: "22px 20px",
    color: "#FFFF",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: "#FAFAFACC",
      color: "#005027",
    },
  },
  navlinkActive: {
    backgroundColor: "#FAFAFA",
    color: "#005027",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
  textField: {
    margin: "0 auto",
    fontSize: "44px",
  },
  drawerListItemActive: {
    background: theme.palette.action.selected,
  },
  backButton: {
    color: "#FFFFFF",
  },
  breadcrumbs: {
    maxWidth: 1140,
    width: "100%",
    margin: "0 auto",
    padding: "8px 20px",
  },
});

export default withStyles(styles)(withRouter(App));
