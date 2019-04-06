import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, withStyles } from '@material-ui/core';

export const AuthDialogContext = React.createContext({
  open: false,
  toggleAuthDialog: () => {},
});

class AuthDialog extends Component {
  constructor(props) {
    super(props);
    this.toggleAuthDialog = this.toggleAuthDialog.bind(this)
    this.state = {
      open: false,
      toggleAuthDialog: this.toggleAuthDialog 
    }
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
            <DialogContent>
              <form>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Usuário"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Senha"
                  type="password"
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

export default withStyles({})(AuthDialog)
