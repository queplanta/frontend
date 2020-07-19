import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { IntlProvider } from "react-intl";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AppBar, Hidden, withStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "found";
import { SnackbarProvider } from "notistack";
import PageviewTracking from "./lib/PageviewTracking";
import theme from "./theme.js";
import Footer from "./Footer.js";
import HeaderToolbar from "./HeaderToolbar.js";
import BottomNavbar from "./BottomNavbar.js";
import headerNavBackground from "./assets/background.jpg";
import { LoginRequiredProvider } from "./accounts/LoginRequired.js";
import Jumbotron from "./Jumbotron.js";
import { ToolbarHeaderContext } from "./ToolbarHeaderContext.js";
import "./index.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appbarPosition: "static",
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  render() {
    const { classes, viewer } = this.props;
    const { appbarPosition } = this.state;
    const { pathname } = this.props.match.location;
    const isHomeRoute = pathname === "/";

    return (
      <IntlProvider locale="pt-BR">
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <LoginRequiredProvider viewer={viewer}>
              <PageviewTracking>
                <CssBaseline />
                <Helmet
                  titleTemplate="%s | Que Planta"
                  defaultTitle="Que Planta - Conectando Pessoas e Plantas"
                />
                <AppBar
                  position={appbarPosition}
                  className={clsx(classes.bgNv, classes.appbar)}
                >
                  <ToolbarHeaderContext.Provider
                    value={
                      <HeaderToolbar viewer={viewer} location={pathname} />
                    }
                  >
                    <ToolbarHeaderContext.Consumer>
                      {(value) => <b>{value}</b>}
                    </ToolbarHeaderContext.Consumer>
                  </ToolbarHeaderContext.Provider>
                </AppBar>

                <div className={classes.pagelet}>
                  <Hidden mdUp implementation="css">
                    {(!viewer.me || !viewer.me.isAuthenticated) &&
                      isHomeRoute && (
                        <Jumbotron
                          className={clsx(classes.bgNv, classes.jumbotron)}
                        />
                      )}
                  </Hidden>
                  {this.props.children}
                </div>
                <Hidden mdDown implementation="css">
                  <Footer />
                </Hidden>
                <Hidden mdUp implementation="css">
                  <BottomNavbar viewer={viewer} />
                </Hidden>
              </PageviewTracking>
            </LoginRequiredProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </IntlProvider>
    );
  }

  updateDimensions() {
    this.setState({
      appbarPosition: window.innerWidth <= 600 ? "fixed" : "static",
    });
  }

  componentDidMount() {
    if (window.innerWidth <= 600) {
      this.setState({ appbarPosition: "fixed" });
    }
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}

const styles = (theme) => ({
  pagelet: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: 56,
    },
  },
  appbar: {},
  bgNv: {
    color: "#FFFFFF",
    backgroundColor: "#047c4d",
    backgroundImage: `url(${headerNavBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 0",
    boxShadow: "0 1px rgba(255,255,255,0.1)",
  },
  jumbotron: {
    paddingTop: 32,
    paddingBottom: 32,
    backgroundPosition: "0 -56px !important",
  },
});

export default withStyles(styles)(withRouter(App));
