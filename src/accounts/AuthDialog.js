import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, withStyles } from '@material-ui/core';
import { createFragmentContainer } from 'react-relay';
import AuthMutation from './Auth.mutation.js';
import RegisterMutation from './Register.mutation.js';
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
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.changeToRegister = this.changeToRegister.bind(this)
    this.changeToAuth = this.changeToAuth.bind(this)
    this.state = {
      open: false,
      toggleAuthDialog: this.toggleAuthDialog,
      username: '',
      firstName: '',
      email: '',
      password1: '',
      password2: '',
      errors: [],
      tab: 'auth',
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
				password: this.state.password1
			},
			{
				setFormErrors
			}
		)
  }

  handleRegisterSubmit(e) {
    e.preventDefault()
    const { relay, setFormErrors } = this.props;
    RegisterMutation.commit(
			relay.environment,
			{
				firstName: this.state.firstName,
				username: this.state.username,
				email: this.state.email,
				password1: this.state.password1,
				password2: this.state.password2
			},
			{
				setFormErrors
			}
		)
  }

  toggleAuthDialog() {
    this.setState(state => ({open: !state.open}))
  }
  
  changeToRegister() {
    this.setState({tab: 'register'})
  }
  
  changeToAuth() {
    this.setState({tab: 'auth'})
  }

  render() {
    const isAuthScreen = this.state.tab === 'auth'
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
              onSubmit: isAuthScreen ? this.handleAuthSubmit : this.handleRegisterSubmit
            }}
          >
            {isAuthScreen ? this.renderLogin() : this.renderRegister()}
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
          value={this.state.username}
          required
          fullWidth
        />
        <TextField
          margin="dense"
          label="Senha"
          type="password"
          onChange={this.handleChangeInput.bind(this, 'password1')}
          value={this.state.password1}
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="contained" color="primary" type="submit">Entrar</Button>
        <Button disabled>Ou</Button>
        <Button onClick={this.changeToRegister}>Cadastrar</Button>
      </DialogActions>
    </React.Fragment>
  }

  renderRegister() {
    const {classes} = this.props
    return <React.Fragment>
      <DialogTitle id="auth-dialog-title">Entrar</DialogTitle>
      <DialogContent>
        <FormErrors filter={{location: "__all__"}} />
        <TextField
          autoFocus
          margin="dense"
          label="Usuário"
          placeholder="Nome de usuário unico na rede, será sua identificação principal"
          onChange={this.handleChangeInput.bind(this, 'username')}
          value={this.state.username}
          required
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Nome e Sobrenome"
          onChange={this.handleChangeInput.bind(this, 'firstName')}
          value={this.state.firstName}
          required
          fullWidth
        />
        <TextField
          margin="dense"
          label="E-mail"
          type="email"
          onChange={this.handleChangeInput.bind(this, 'email')}
          value={this.state.email}
          required
          fullWidth
        />
        <TextField
          margin="dense"
          label="Senha"
          type="password"
          onChange={this.handleChangeInput.bind(this, 'password1')}
          value={this.state.password1}
          required
          fullWidth
        />
        <TextField
          margin="dense"
          label="Confirmar Senha"
          placeholder="Repita sua senha para ter certeza que não digitou errado"
          type="password"
          onChange={this.handleChangeInput.bind(this, 'password2')}
          value={this.state.password2}
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="contained" color="primary" type="submit">Criar conta</Button>
        <Button disabled>Ou se já tiver um cadastro</Button>
        <Button onClick={this.changeToAuth}>Entrar</Button>
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
