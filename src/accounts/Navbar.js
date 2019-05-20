import React, { Component } from 'react';
import { createFragmentContainer } from 'react-relay';
import { Button, withStyles } from '@material-ui/core';
import Media from 'react-media';
import query from './Navbar.query.js';
import { AuthDialogContext } from './AuthDialog.js'
import DeauthMutation from './Deauth.mutation.js'

class AccountNavbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(e) {
    const { relay } = this.props;
    DeauthMutation.commit(relay.environment)
  }

  render() {
    const {me} = this.props;
    if(me !== null && me.isAuthenticated === true) {
      return <div>
        authed <Button onClick={this.handleLogout}>Sair</Button>
      </div>
    } else {
      return <AuthDialogContext.Consumer>
        {({toggleAuthDialog}) => {
          return <Media
            query="(min-width: 768px)"
          >
            {matches => matches ? (
              <div>Quer participar? <Button onClick={toggleAuthDialog} variant="outlined" color="primary">Entre ou registre-se</Button> em segundos.</div>) : (
              <div>mobile button</div>
            )}
          </Media>
        }}
      </AuthDialogContext.Consumer>
    }
  }
}

const styles = {
}

export default createFragmentContainer(
  withStyles(styles)(AccountNavbar),
  query
)
