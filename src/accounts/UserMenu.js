import React from "react";
import { Divider, Menu, MenuItem, ListItemText } from "@material-ui/core";
import { Link as RouterLink } from "found";
import { hasPerm } from "../lib/perms.js";

function UserMenu(props) {
  const { anchorEl, handleClose, handleLogout, me } = props;

  return (
    <Menu
      id="user-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClick={handleClose}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {hasPerm(me, "add_post") && (
        <MenuItem to={`/blog/novo`} component={RouterLink}>
          <ListItemText primary="Nova Post no Blog" />
        </MenuItem>
      )}
      {hasPerm(me, "add_page") && (
        <MenuItem to={`/paginas/nova`} component={RouterLink}>
          <ListItemText primary="Nova Página" />
        </MenuItem>
      )}
      {(hasPerm(me, "add_page") || hasPerm(me, "add_post")) && <Divider />}
      <MenuItem to={`/u/${me.username}`} component={RouterLink}>
        <ListItemText primary="Meu perfil" />
      </MenuItem>
      <MenuItem to={`/conta/editar`} component={RouterLink}>
        <ListItemText primary="Editar perfil" />
      </MenuItem>
      <MenuItem to={`/conta/editar/senha`} component={RouterLink}>
        <ListItemText primary="Alterar senha" />
      </MenuItem>
      <MenuItem to={`/conta/editar/avatar`} component={RouterLink}>
        <ListItemText primary="Alterar foto" />
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>Sair</MenuItem>
    </Menu>
  );
}

export default UserMenu;
