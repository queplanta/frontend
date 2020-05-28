import React, { Component } from "react";
import slugify from "slugify";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
import AuthMutation from "./Auth.mutation.js";
import AuthSocialMutation from "./AuthSocial.mutation.js";
import RegisterMutation from "./Register.mutation.js";
import ResetPasswordEmailMutation from "./ResetPasswordEmail.mutation.js";
import {
  hasFormErrors,
  FormErrors,
  TextFieldWithError,
  SnackbarErrorContent,
} from "../FormErrors.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import withWidth from "../lib/withWidth.js";
import { withSnackbar } from "notistack";
import DialogTitle from "../lib/DialogTitle.js";
import SocialButton from "../lib/SocialButton.js";
import logoImg from "../assets/queplanta-icon.svg";
import logoTextImg from "../assets/queplanta-text-dark.svg";

class AuthDialog extends Component {
  constructor(props) {
    super(props);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleAuthSubmit = this.handleAuthSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleResetPasswordSubmit = this.handleResetPasswordSubmit.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.changeToRegister = this.changeToRegister.bind(this);
    this.changeToAuth = this.changeToAuth.bind(this);
    this.changeToForgotPassword = this.changeToForgotPassword.bind(this);
    this.handleChangeEmailInput = this.handleChangeEmailInput.bind(this);

    this.handleSocialLoginFailure = this.handleSocialLoginFailure.bind(this);

    this.state = {
      isLoading: false,
      open: false,
      username: "",
      firstName: "",
      email: "",
      password1: "",
      password2: "",
      errors: [],
      tab: "auth",
      showLoginRequired: false,
    };
  }

  handleChangeInput(fieldName, e) {
    e.preventDefault();
    this.setState({ [fieldName]: e.target.value });
  }

  handleUsernameInput(e) {
    let username = this.toSlugify(e.target.value);
    this.setState({ username: username });
  }

  handleAuthSubmit(e) {
    e.preventDefault();
    const { environment, setFormErrors } = this.props;
    this.setState({ isLoading: true, showLoginRequired: false }, () => {
      AuthMutation.commit(
        environment,
        {
          username: this.state.username,
          password: this.state.password1,
        },
        {
          onSuccess: () => {
            this.onClose();
            this.setState({ isLoading: false });
          },
          onError: () => {
            this.setState({ isLoading: false });
          },
          setFormErrors,
        }
      );
    });
  }

  handleRegisterSubmit(e) {
    e.preventDefault();
    const { environment, setFormErrors } = this.props;
    this.setState({ isLoading: true }, () => {
      RegisterMutation.commit(
        environment,
        {
          firstName: this.state.firstName,
          username: this.state.username,
          email: this.state.email,
          password1: this.state.password1,
          password2: this.state.password2,
        },
        {
          onSuccess: () => {
            this.onClose();
            this.setState({ isLoading: false });
          },
          onError: () => {
            this.setState({ isLoading: false });
          },
          setFormErrors,
        }
      );
    });
  }

  handleResetPasswordSubmit(e) {
    e.preventDefault();
    const { environment, setFormErrors } = this.props;
    this.setState({ isLoading: true }, () => {
      ResetPasswordEmailMutation.commit(
        environment,
        {
          email: this.state.email,
        },
        {
          onSuccess: () => {
            this.onClose();
            this.props.enqueueSnackbar(
              "Pedido de redefinição de senha enviado com sucesso, verifique seu e-mail.",
              { variant: "success" }
            );
            this.setState({ isLoading: false });
          },
          onError: () => {
            this.setState({ isLoading: false });
          },
          setFormErrors,
        }
      );
    });
  }

  toggleAuthDialog() {
    this.setState((state) => ({ open: !state.open }));
  }

  onOpen(options) {
    this.setState({ ...options, open: true, username: "", password1: "" });
  }

  onClose() {
    this.setState({ open: false });
  }

  changeToRegister() {
    this.setState({ tab: "register" });
  }

  changeToAuth() {
    this.setState({ tab: "auth" });
  }

  changeToForgotPassword() {
    this.setState({ tab: "forgotpswd" });
  }

  handleChangeEmailInput(e) {
    e.preventDefault();
    let currentEmailAddress = e.target.value;
    let emailAddressWithOutProvider = currentEmailAddress.split("@")[0];
    let username = this.toSlugify(emailAddressWithOutProvider);
    this.setState({ username: username, email: currentEmailAddress });
  }

  toSlugify(fieldStr) {
    return slugify(fieldStr, {
      replacement: "-",
      remove: /[*+~.(){}[\]'"!:@/\\;,´`^#=]/g,
      lower: true,
    });
  }

  handleSocialLogin(provider, user) {
    const { environment } = this.props;
    const {
      _token: { accessToken },
    } = user;

    AuthSocialMutation.commit(
      environment,
      {
        provider,
        accessToken,
      },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  }

  handleSocialLoginFailure(err) {
    console.error(err);
    this.props.enqueueSnackbar("Não foi possivel entrar...", {
      variant: "error",
    });
  }

  render() {
    const { open, tab } = this.state;
    const fullScreen = isWidthDown("sm", this.props.width);
    let handleSubmit = this.handleAuthSubmit;

    if (tab === "register") {
      handleSubmit = this.handleRegisterSubmit;
    }
    if (tab === "forgotpswd") {
      handleSubmit = this.handleResetPasswordSubmit;
    }
    return (
      <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={this.onClose}
        aria-labelledby="auth-dialog-title"
        scroll="body"
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        {tab === "auth" && this.renderLogin()}
        {tab === "register" && this.renderRegister()}
        {tab === "forgotpswd" && this.renderForgotPassword()}
      </Dialog>
    );
  }

  renderLogin() {
    const { classes } = this.props;
    const fullScreen = isWidthDown("sm", this.props.width);
    return (
      <React.Fragment>
        <DialogTitle id="auth-dialog-title" onClose={this.onClose}>
          Entrar
        </DialogTitle>
        <DialogContent>
          {fullScreen && (
            <div className={classes.dialogLogo}>
              <Typography noWrap>
                <img src={logoImg} alt="Que Planta" width="32" height="32" />
                <img src={logoTextImg} alt="Que Planta" height="22" />
              </Typography>
            </div>
          )}
          {this.state.showLoginRequired && (
            <SnackbarErrorContent message="Você precisa estar autenticado para executar essa ação." />
          )}
          <FormErrors filter={{ location: "__all__" }} />
          <TextField
            autoFocus={!fullScreen}
            margin="dense"
            label="Usuário"
            onChange={this.handleChangeInput.bind(this, "username")}
            value={this.state.username}
            autoComplete="username"
            required
            fullWidth
          />
          <TextField
            margin="dense"
            label="Senha"
            type="password"
            onChange={this.handleChangeInput.bind(this, "password1")}
            value={this.state.password1}
            autoComplete="current-password"
            required
            fullWidth
          />
          <div className={classes.wrapButton}>
            <ButtonWithProgress
              fullWidth={true}
              variant="contained"
              color="primary"
              type="submit"
              isLoading={this.state.isLoading}
            >
              Entrar
            </ButtonWithProgress>
            <Button
              className={classes.marginTop}
              onClick={this.changeToForgotPassword}
            >
              Esqueceu a senha?
            </Button>
          </div>
          <div>
            <div className={classes.orAuthSeparator}>ou</div>
            <SocialButton
              provider="facebook"
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              className={classes.fbBtn}
              onLoginSuccess={this.handleSocialLogin.bind(this, "facebook")}
              onLoginFailure={this.handleSocialLoginFailure}
              key={"facebook"}
            >
              Entrar com Facebook
            </SocialButton>
            <SocialButton
              provider="google"
              appId={process.env.REACT_APP_GOOGLE_APP_ID}
              onLoginSuccess={this.handleSocialLogin.bind(
                this,
                "google-oauth2"
              )}
              onLoginFailure={this.handleSocialLoginFailure}
              key={"google"}
            >
              Entrar com Google
            </SocialButton>
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Typography color="textSecondary" className={classes.textSmall}>
            Não tem uma conta?
          </Typography>
          <Button onClick={this.changeToRegister}>Cadastre-se</Button>
        </DialogActions>
      </React.Fragment>
    );
  }

  renderRegister() {
    const { classes } = this.props;
    const fullScreen = isWidthDown("sm", this.props.width);
    return (
      <React.Fragment>
        <DialogTitle id="auth-dialog-title" onClose={this.onClose}>
          Cadastre-se
        </DialogTitle>
        <DialogContent>
          {fullScreen && (
            <div className={classes.dialogLogo}>
              <Typography noWrap>
                <img src={logoImg} alt="Que Planta" width="32" height="32" />
                <img src={logoTextImg} alt="Que Planta" height="22" />
              </Typography>
            </div>
          )}
          <FormErrors filter={{ location: "__all__" }} />
          <TextFieldWithError
            autoFocus={!fullScreen}
            margin="dense"
            label="Nome e Sobrenome"
            onChange={this.handleChangeInput.bind(this, "firstName")}
            value={this.state.firstName}
            errorFilter={{ location: "firstName" }}
            required
            fullWidth
          />
          <TextFieldWithError
            margin="dense"
            label="E-mail"
            type="email"
            onChange={this.handleChangeEmailInput}
            value={this.state.email}
            errorFilter={{ location: "email" }}
            required
            fullWidth
          />
          <TextFieldWithError
            margin="dense"
            label="URL"
            placeholder="URL única na rede, será sua identificação principal"
            onChange={this.handleUsernameInput}
            value={this.state.username}
            errorFilter={{ location: "username" }}
            required
            fullWidth
          />
          <TextFieldWithError
            margin="dense"
            label="Senha"
            type="password"
            onChange={this.handleChangeInput.bind(this, "password1")}
            value={this.state.password1}
            errorFilter={{ location: "password1" }}
            required
            fullWidth
          />
          <TextFieldWithError
            margin="dense"
            label="Confirmar Senha"
            placeholder="Repita sua senha para ter certeza que não digitou errado"
            type="password"
            onChange={this.handleChangeInput.bind(this, "password2")}
            value={this.state.password2}
            errorFilter={{ location: "password2" }}
            required
            fullWidth
          />
          <div className={classes.wrapButton}>
            <ButtonWithProgress
              fullWidth={true}
              variant="contained"
              color="primary"
              type="submit"
              isLoading={this.state.isLoading}
            >
              Cadastre-se
            </ButtonWithProgress>
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Typography color="textSecondary" className={classes.textSmall}>
            Tem uma conta?
          </Typography>
          <Button onClick={this.changeToAuth}>Conecte-se</Button>
        </DialogActions>
      </React.Fragment>
    );
  }

  renderForgotPassword() {
    const { classes } = this.props;
    const fullScreen = isWidthDown("sm", this.props.width);
    return (
      <React.Fragment>
        <DialogTitle id="auth-dialog-title" onClose={this.onClose}>
          Problemas para entrar?
        </DialogTitle>
        <DialogContent>
          {fullScreen && (
            <div className={classes.dialogLogo}>
              <Typography noWrap>
                <img src={logoImg} alt="Que Planta" width="32" height="32" />
                <img src={logoTextImg} alt="Que Planta" height="22" />
              </Typography>
            </div>
          )}
          <FormErrors filter={{ location: "__all__" }} />
          <Typography
            color="textSecondary"
            className={clsx(classes.textSmall, classes.marginTop)}
          >
            Insira o endereço de e-mail associado à sua conta{" "}
            <strong>Que Planta</strong>, você receberá uma confirmação por
            e-mail para alterar sua senha.
          </Typography>
          <TextFieldWithError
            margin="dense"
            label="E-mail"
            type="email"
            onChange={this.handleChangeInput.bind(this, "email")}
            value={this.state.email}
            errorFilter={{ location: "email" }}
            required
            fullWidth
          />
          <div className={classes.wrapButton}>
            <ButtonWithProgress
              fullWidth={true}
              variant="contained"
              color="primary"
              type="submit"
              isLoading={this.state.isLoading}
            >
              Enviar
            </ButtonWithProgress>
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={this.changeToAuth}>Voltar ao login</Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

const styles = (theme) => ({
  dialogActions: {
    marginLeft: theme.spacing(3) - 4,
    marginRight: theme.spacing(3) - 4,
    marginBottom: theme.spacing(3),
    justifyContent: "flex-start",
  },
  dialogLogo: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
  },
  wrapButton: {
    marginTop: theme.spacing(2),
  },
  textSmall: {
    fontSize: "14px",
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  orAuthSeparator: {
    color: "#757575",
    textAlign: "center",
    "&::before": {
      backgroundColor: "#CCC",
      content: '""',
      display: "inline-block",
      height: "2px",
      position: "relative",
      verticalAlign: "middle",
      width: "30%",
      right: "10px",
      marginLeft: "-30%",
    },
    "&::after": {
      backgroundColor: "#CCC",
      content: '""',
      display: "inline-block",
      height: "2px",
      position: "relative",
      verticalAlign: "middle",
      width: "30%",
      left: "10px",
      marginRight: "-30%",
    },
  },
  fbBtn: {
    backgroundColor: "#1877f2",
    color: "#FFF",
    marginTop: "15px",
    marginBottom: "20px",
    "&:hover": {
      backgroundColor: "#1877f2",
    },
  },
});

export default withStyles(styles)(
  withWidth()(withSnackbar(hasFormErrors(AuthDialog)))
);
