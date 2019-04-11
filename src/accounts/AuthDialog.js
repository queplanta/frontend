import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, withStyles } from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import AuthMutation from './Auth.mutation.js';
import query from './Auth.query.js';

export const AuthDialogContext = React.createContext({
  open: false,
  toggleAuthDialog: () => {},
});

class AuthDialog extends Component {
  constructor(props) {
    super(props);
    this.toggleAuthDialog = this.toggleAuthDialog.bind(this)
    this.handleAuthSubmit = this.handleAuthSubmit.bind(this)
    this.state = {
      open: false,
      toggleAuthDialog: this.toggleAuthDialog,
      username: '',
      password: '',
    }
  }

  handleChangeInput(fieldName, e) {
    e.preventDefault()
    this.setState({[fieldName]: e.target.value})
  }

  handleAuthSubmit(e) {
    e.preventDefault()
    const { relay } = this.props;
    AuthMutation.commit(relay.environment, this.state.username, this.state.password)
  }

  toggleAuthDialog() {
    this.setState(state => ({open: !state.open}))
  }

  render() {
    return <AuthDialogContext.Provider value={this.state}>
      {this.props.children}
      <AuthDialogContext.Consumer>
        {({open, toggleAuthDialog}) => (
          <Dialog
            open={open}
            onClose={toggleAuthDialog}
            aria-labelledby="auth-dialog-title"
          >
            <DialogTitle id="auth-dialog-title">Entrar</DialogTitle>
            <DialogContent component="form" onSubmit={this.handleAuthSubmit}>
              <form>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Usuário"
                  onChange={this.handleChangeInput.bind(this, 'username')}
                  required
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Senha"
                  type="password"
                  onChange={this.handleChangeInput.bind(this, 'password')}
                  required
                  fullWidth
                />
                <Button variant="contained" color="primary" type="submit">Entrar</Button> ou <Button>Cadastrar</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </AuthDialogContext.Consumer>
    </AuthDialogContext.Provider>
  }
}

export default createFragmentContainer(
  withStyles({})(AuthDialog),
  query
)
