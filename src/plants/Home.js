import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { QueryRenderer } from "react-relay";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  FormGroup,
  Checkbox,
  List,
  Typography,
  Grid,
  InputBase,
  Paper,
  Hidden,
  LinearProgress,
  withStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withRouter } from "found";
import PageTitle from "../lib/PageTitle.js";
import { Width } from "../ui";
import PlantList from "./PlantList.js";
import BreadcrumbsWithHome from "../lib/BreadcrumbsWithHome.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import query from "./Home.filterQuery.js";

function getArrayOfValues(a) {
  if (typeof a === "string") {
    return [a];
  }

  if (!a) {
    return [];
  }

  return a;
}

export class PlantsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBy: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
  }

  onChangeSearch(e) {
    this.setState({ searchBy: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.router.push(`/plantas?q=${this.state.searchBy}`);
  }

  handleChangeFilter(e) {
    const { name, value } = e.target;
    const currentQuery = this.props.match.location.query;
    const currentValues = getArrayOfValues(currentQuery[name]);
    const exists = currentValues.indexOf(value) >= 0;

    if (!exists) {
      this.props.router.push({
        pathname: this.props.match.location.pathname,
        query: {
          ...currentQuery,
          [name]: [...currentValues, value],
        },
      });
    } else {
      this.props.router.push({
        pathname: this.props.match.location.pathname,
        query: {
          ...currentQuery,
          [name]: currentValues.filter((item) => item !== value),
        },
      });
    }
  }

  renderFilterOptions(options, name) {
    const currentQuery = this.props.match.location.query;
    const currentValues = getArrayOfValues(currentQuery[name]);
    return options.map((option) => {
      const checked = currentValues.indexOf(option.name) >= 0;
      return (
        <FormControlLabel
          key={option.name}
          control={
            <Checkbox
              checked={checked}
              name={name}
              value={option.name}
              onChange={this.handleChangeFilter}
            />
          }
          label={option.description}
        />
      );
    });
  }

  render() {
    const { classes, relay, ranks, edibilities } = this.props;

    let title = relay.variables.edibles ? `Plantas Comestíveis` : `Plantas`;

    if (relay.variables.search) {
      title = `Busca de plantas por:
      ${relay.variables.search}`;
    }

    const { location } = this.props.match;

    return (
      <Width>
        <Helmet title={title} /> <PageTitle>{title}</PageTitle>
        <Hidden mdUp>
          <BreadcrumbsWithHome>
            <BreadcrumbsItem
              to={relay.variables.edibles ? `/plantas/comestíveis` : `/plantas`}
            >
              {title}
            </BreadcrumbsItem>
          </BreadcrumbsWithHome>
        </Hidden>
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
                inputProps={{
                  "aria-label": "search",
                }}
                value={this.state.searchBy}
                onChange={this.onChangeSearch}
              />{" "}
            </form>{" "}
          </Paper>{" "}
        </Hidden>{" "}
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Taxonomia</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup component={List}>
                  {this.renderFilterOptions(ranks.enumValues, "rank")}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            {/*<Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Extrato</Typography>{" "}
              </AccordionSummary>{" "}
              <AccordionDetails>
                <FormGroup component={List}>
                  {["Baixo", "Médio", "Alto", "Emergente"].map((label) => (
                    <FormControlLabel
                      control={<Checkbox name="gilad" />}
                      label={label}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>*/}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Comestibilidade</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup component={List}>
                  {this.renderFilterOptions(
                    edibilities.enumValues,
                    "edibility"
                  )}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            {/*<TabsRoute
              indicatorColor="primary" textColor="primary"
              orientation="vertical" variant="scrollable"> <TabRoute
              label="Todas" wrapped value="/plantas" /> <TabRoute
                label="Comestíveis" wrapped value="/plantas/comestiveis" />
                </TabsRoute>*/}{" "}
          </Grid>
          <Grid item md={8}>
            <QueryRenderer
              environment={relay.environment}
              query={query}
              variables={{
                search: location.query.q,
                rank: location.query.rank,
                edibility: location.query.edibility,
              }}
              render={({ error, props }) => {
                if (!props) {
                  return <LinearProgress />;
                }
                return <PlantList count={30} {...props} />;
              }}
            />
          </Grid>
        </Grid>
      </Width>
    );
  }
}

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
export default withRouter(withStyles(styles)(PlantsHome));
