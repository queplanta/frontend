import React, { useState } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  MenuList,
  MenuItem,
  ListItemText,
  withStyles,
} from "@material-ui/core";
import { Link as RouterLink } from "found";
import MenuIcon from "@material-ui/icons/Menu";

function HeaderMenu(props) {
  const { classes } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  function handleDrawerToggle() {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
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
    </>
  );
}

const drawerWidth = 240;

const styles = (theme) => ({
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
});

export default withStyles(styles)(HeaderMenu);
