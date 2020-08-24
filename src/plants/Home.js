import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { InputBase, Paper, Hidden, withStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PageTitle from "../lib/PageTitle.js";
import SingleHeader from "../lib/SingleHeader.js";
import { TabsRoute, TabRoute } from "../lib/Tabs.js";
import { Width } from "../ui";
import PlantList from "./PlantList.js";
import { ToolbarHeaderContext } from "../ToolbarHeaderContext.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

export class PlantsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBy: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  componentDidMount() {
    const toolbarContext = this.context;
    toolbarContext.setToolbarHeader(<SingleHeader>Plantas</SingleHeader>);
  }

  onChangeSearch(e) {
    this.setState({ searchBy: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.router.push(`/plantas?q=${this.state.searchBy}`);
  }

  render() {
    const { classes, viewer, relay } = this.props;
    let title = relay.variables.edibles ? `Plantas Comestíveis` : `Plantas`;

    if (relay.variables.search) {
      title = `Busca de plantas por: ${relay.variables.search}`;
    }

    return (
      <Width>
        <BreadcrumbsItem to="/plantas">Plantas</BreadcrumbsItem>
        <Helmet title={title} />
        <Hidden mdUp implementation="css">
          <Paper className={classes.paper}>
            <form className={classes.search} onSubmit={this.handleSearch}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                autoFocus={!relay.variables.search}
                placeholder="Buscar..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={this.state.searchBy}
                onChange={this.onChangeSearch}
              />
            </form>
          </Paper>
        </Hidden>
        <Paper className={classes.paper}>
          <TabsRoute indicatorColor="primary" textColor="primary">
            <TabRoute label="Todas" wrapped value="/plantas" />
            <TabRoute
              label="Comestíveis"
              wrapped
              value="/plantas/comestiveis"
            />
          </TabsRoute>
        </Paper>
        <PageTitle>{title}</PageTitle>
        <PlantList viewer={viewer} count={30} />
      </Width>
    );
  }
}

PlantsHome.contextType = ToolbarHeaderContext;

const styles = (theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  textField: {
    margin: "0 auto",
    fontSize: "44px",
  },
});
export default withStyles(styles)(PlantsHome);
