import React, { Component } from 'react';
import { createFragmentContainer } from 'react-relay';
import { Avatar, Button, IconButton, Menu, MenuItem, ListItemText, Tooltip, withStyles } from '@material-ui/core';
import { Link  as RouterLink } from 'found';
import _ from 'lodash';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Media from 'react-media';
import query from './Navbar.query.js';
import DeauthMutation from './Deauth.mutation.js';
import { withLoginRequired } from './LoginRequired.js';

class AccountNavbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpenLoginDialog = this.handleOpenLoginDialog.bind(this)
    this.state = {anchorEl: null}
  }

  handleLogout(e) {
    const { relay } = this.props;
    DeauthMutation.commit(relay.environment)
  }

  handleClose() {
    this.setState({anchorEl: null})
  }

  handleOpen(e) {
    this.setState({anchorEl: e.currentTarget})
  }

  handleOpenLoginDialog() {
    this.props.openAuthDialog()
  }

  render() {
    const {classes, me} = this.props;
    const {anchorEl} = this.state;

    if(me !== null && me.isAuthenticated === true) {
      return <div>
        <Tooltip title={me.username} placement="top">
          <Avatar
            className={classes.avatar}
            alt={me.username}
            src={_.get(me, "avatar.url", null)}
            onClick={this.handleOpen}
          />
        </Tooltip>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClick={this.handleClose}
          onClose={this.handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem to={`/u/${me.username}`} component={RouterLink} activeClassName={classes.drawerListItemActive}>
            <ListItemText primary="Meu perfil"/>
          </MenuItem>   
          <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
        </Menu>
      </div>
    } else {
      return <Media
        query="(min-width: 768px)"
      >
        {matches => matches ? (
          <div>Quer participar? <Button onClick={this.handleOpenLoginDialog} variant="outlined" classes={{root: classes.btn}}>Entre ou registre-se</Button> em segundos.</div>) : (
          <Tooltip title="Minha conta" placement="top">
            <IconButton onClick={this.handleOpenLoginDialog} className={classes.accountIcon}><AccountCircleIcon /></IconButton>
          </Tooltip>
        )}
      </Media>
    }
  }
}

const styles = {
  avatar: {
    cursor: 'pointer',
    width: '32px',
    height: '32px'
  },
  btn: {
    backgroundColor: '#FFFFFF',
    color: '#005027',
    margin: '0 10px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }
  },
  accountIcon: {
    color: '#FFF',
  }
}

export default createFragmentContainer(
  withStyles(styles)(withLoginRequired(AccountNavbar)),
  query
)
