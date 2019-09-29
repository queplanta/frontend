import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, withStyles } from '@material-ui/core';
import AuthMutation from './Auth.mutation.js';
import RegisterMutation from './Register.mutation.js';
import { hasFormErrors, FormErrors, TextFieldWithError, SnackbarErrorContent } from '../FormErrors.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';

class AuthDialog extends Component {
  constructor(props) {
    super(props)
    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
    this.handleAuthSubmit = this.handleAuthSubmit.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.changeToRegister = this.changeToRegister.bind(this)
    this.changeToAuth = this.changeToAuth.bind(this)
    this.state = {
      isLoading: false,
      open: false,
      username: '',
      firstName: '',
      email: '',
      password1: '',
      password2: '',
      errors: [],
      tab: 'auth',
      showLoginRequired: false,
    }
  }

  handleChangeInput(fieldName, e) {
    e.preventDefault()
    this.setState({[fieldName]: e.target.value})
  }

  handleAuthSubmit(e) {
    e.preventDefault();
    const { environment, setFormErrors } = this.props;
    this.setState({isLoading: true, showLoginRequired: false}, () => {
      AuthMutation.commit(
        environment,
        {
          username: this.state.username,
          password: this.state.password1
        },
        {
          onSuccess: () => {
            this.onClose()
            this.setState({isLoading: false})
          },
          onError: () => {
            this.setState({isLoading: false})
          },
          setFormErrors
        }
      )
    })
  }

  handleRegisterSubmit(e) {
    e.preventDefault()
    const { environment, setFormErrors } = this.props;
    this.setState({isLoading: true}, () => {
      RegisterMutation.commit(
        environment,
        {
          firstName: this.state.firstName,
          username: this.state.username,
          email: this.state.email,
          password1: this.state.password1,
          password2: this.state.password2
        },
        {
          onSuccess: () => {
            this.onClose()
            this.setState({isLoading: false})
          },
          onError: () => {
            this.setState({isLoading: false})
          },
          setFormErrors
        }
      )
    })
  }

  toggleAuthDialog() {
    this.setState(state => ({open: !state.open}))
  }

  onOpen(options) {
    this.setState({...options, open: true, username: '', password1: ''})
  }

  onClose() {
    this.setState({open: false})
  }
  
  changeToRegister() {
    this.setState({tab: 'register'})
  }
  
  changeToAuth() {
    this.setState({tab: 'auth'})
  }

  render() {
    const { open, tab } = this.state
    const isAuthScreen = tab === 'auth'
    return <Dialog
      open={open}
      onClose={this.onClose}
      aria-labelledby="auth-dialog-title"
      scroll="body"
      PaperProps={{
        component: "form",
        onSubmit: isAuthScreen ? this.handleAuthSubmit : this.handleRegisterSubmit
      }}
    >
      {isAuthScreen ? this.renderLogin() : this.renderRegister()}
    </Dialog>
  }

  renderLogin() {
    const {classes} = this.props
    return <React.Fragment>
      <DialogTitle id="auth-dialog-title">Entrar</DialogTitle>
      <DialogContent>
        {this.state.showLoginRequired  && <SnackbarErrorContent message="Você precisa estar autenticado para executar essa ação." />}
        <FormErrors filter={{location: "__all__"}} />
        <TextField
          autoFocus
          margin="dense"
          label="Usuário"
          onChange={this.handleChangeInput.bind(this, 'username')}
          value={this.state.username}
          autoComplete="username"
          required
          fullWidth
        />
        <TextField
          margin="dense"
          label="Senha"
          type="password"
          onChange={this.handleChangeInput.bind(this, 'password1')}
          value={this.state.password1}
          autoComplete="current-password"
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <ButtonWithProgress variant="contained" color="primary" type="submit" isLoading={this.state.isLoading}>Entrar</ButtonWithProgress>
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
        <TextFieldWithError
          autoFocus
          margin="dense"
          label="Usuário"
          placeholder="Nome de usuário unico na rede, será sua identificação principal"
          onChange={this.handleChangeInput.bind(this, 'username')}
          value={this.state.username}
          errorFilter={{location: "username"}}
          required
          fullWidth
        />
        <TextFieldWithError
          margin="dense"
          label="Nome e Sobrenome"
          onChange={this.handleChangeInput.bind(this, 'firstName')}
          value={this.state.firstName}
          errorFilter={{location: "firstName"}}
          required
          fullWidth
        />
        <TextFieldWithError
          margin="dense"
          label="E-mail"
          type="email"
          onChange={this.handleChangeInput.bind(this, 'email')}
          value={this.state.email}
          errorFilter={{location: "email"}}
          required
          fullWidth
        />
        <TextFieldWithError
          margin="dense"
          label="Senha"
          type="password"
          onChange={this.handleChangeInput.bind(this, 'password1')}
          value={this.state.password1}
          errorFilter={{location: "password1"}}
          required
          fullWidth
        />
        <TextFieldWithError
          margin="dense"
          label="Confirmar Senha"
          placeholder="Repita sua senha para ter certeza que não digitou errado"
          type="password"
          onChange={this.handleChangeInput.bind(this, 'password2')}
          value={this.state.password2}
          errorFilter={{location: "password2"}}
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <ButtonWithProgress variant="contained" color="primary" type="submit" isLoading={this.state.isLoading}>Criar conta</ButtonWithProgress>
        <Button disabled>Ou se já tiver um cadastro</Button>
        <Button onClick={this.changeToAuth}>Entrar</Button>
      </DialogActions>
    </React.Fragment>
  }
}

const styles = theme => ({
  dialogActions: {
    marginLeft: theme.spacing(3) - 4,
    marginRight: theme.spacing(3) - 4,
    marginBottom: theme.spacing(3),
    justifyContent: "flex-start",
  },
});

export default withStyles(styles)(hasFormErrors(AuthDialog));
