import React, { useState } from "react";
import clsx from "clsx";
import {
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
import { fade } from "@material-ui/core/styles";
import { Link as RouterLink } from "found";
import SearchIcon from "@material-ui/icons/Search";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import MenuIcon from "@material-ui/icons/Menu";
import logoImg from "./assets/queplanta-icon.svg";
import logoTextImg from "./assets/queplanta-text-light.svg";
import AccountNavbar from "./accounts/Navbar.js";
import Jumbotron from "./Jumbotron.js";

function HeaderToolbar(props) {
  const { classes, viewer, location } = props;
  const [searchBy, setSearchBy] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { pathname } = location;

  const plantUrlTest = /^\/[-\w]+-p\d+\/?/;

  const isPlantsRoute = plantUrlTest.test(pathname);
  const isHomeRoute = pathname === "/";

  function handleDrawerToggle() {
    setDrawerOpen(!drawerOpen);
  }

  function onChangeSearch(e) {
    setSearchBy(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    // this.props.router.push(`/plantas?q=${this.state.searchBy}`);
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <MenuList component="div" onClick={handleDrawerToggle}>
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
        <Typography
          className={classes.title}
          component={RouterLink}
          to="/"
          noWrap
        >
          <img src={logoImg} alt="Que Planta" width="32" height="32" />
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
        <AccountNavbar me={viewer.me} />
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>

      <Hidden smDown implementation="css">
        {(!viewer.me || !viewer.me.isAuthenticated) && isHomeRoute && (
          <Jumbotron />
        )}
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
            <form className={classes.search} onSubmit={handleSearch}>
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
                value={searchBy}
                onChange={onChangeSearch}
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
    </React.Fragment>
  );
}

const drawerWidth = 240;

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerListItemActive: {
    background: theme.palette.action.selected,
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
});

export default withStyles(styles)(HeaderToolbar);
