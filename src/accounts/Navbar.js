import React, { Component } from 'react';
import { createFragmentContainer } from 'react-relay';
import { Button, withStyles } from '@material-ui/core';
import query from './Navbar.query.js';
import { AuthDialogContext } from './AuthDialog.js'

class AccountNavbar extends Component {
  render() {
    const {me} = this.props;
    if(me !== null && me.isAuthenticated === true) {
      return <div>
        authed
      </div>
    } else {
      return <AuthDialogContext.Consumer>
        {({toggleAuthDialog}) => {
          return <div>Quer participar? <Button onClick={toggleAuthDialog}>Entre ou registre-se</Button> em segundos.</div>
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
