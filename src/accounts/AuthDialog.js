import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, withStyles } from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import AuthMutation from './Auth.mutation.js';
import query from './Auth.query.js';
import { hasFormErrors, FormErrors } from '../FormErrors.js';
 
export const AuthDialogContext = React.createContext({
  open: false,
  toggleAuthDialog: () => {},
});

class AuthDialog extends Component {
  constructor(props) {
    super(props);
    this.toggleAuthDialog = this.toggleAuthDialog.bind(this)
    this.handleAuthSubmit = this.handleAuthSubmit.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.state = {
      open: false,
      toggleAuthDialog: this.toggleAuthDialog,
      username: '',
      password: '',
      errors: [],
    }
  }

  handleChangeInput(fieldName, e) {
    e.preventDefault()
    this.setState({[fieldName]: e.target.value})
  }

  handleAuthSubmit(e) {
    e.preventDefault()
    const { relay, setFormErrors } = this.props;
    AuthMutation.commit(
			relay.environment,
			{
				username: this.state.username,
				password: this.state.password
			},
			{
				setFormErrors
			}
		)
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
            PaperProps={{
              component: "form",
              onSubmit: this.handleAuthSubmit
            }}
          >
            {this.renderLogin()}
          </Dialog>
        )}
      </AuthDialogContext.Consumer>
    </AuthDialogContext.Provider>
  }

  renderLogin() {
    const {classes} = this.props
    return <React.Fragment>
      <DialogTitle id="auth-dialog-title">Entrar</DialogTitle>
      <DialogContent>
        <FormErrors filter={{location: "__all__"}} />
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
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="contained" color="primary" type="submit">Entrar</Button>
        <Button disabled>Ou</Button>
        <Button>Cadastrar</Button>
      </DialogActions>
    </React.Fragment>
  }
}

const styles = theme => ({
  dialogActions: {
    marginLeft: theme.spacing.unit * 3 - 4,
    marginRight: theme.spacing.unit * 3 - 4,
    marginBottom: theme.spacing.unit * 3,
    justifyContent: "flex-start",
  },
});

export default createFragmentContainer(
  withStyles(styles)(hasFormErrors(AuthDialog)),
  query
)
