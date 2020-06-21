import React from "react";
import { QueryRenderer, createRefetchContainer } from "react-relay";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  LinearProgress,
  Paper,
  IconButton,
  ClickAwayListener,
  withStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import _ from "lodash";
import {
  fragmentSpec,
  refetchQuery,
  renderQuery,
} from "./PlantSelectField.query.js";
import ImgDefault from "./PlantImgDefault.js";

class PlantSelectField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      showResults: false,
      isLoading: false,
      disposable: null,
    };

    this.handleChangeSearchTerm = this.handleChangeSearchTerm.bind(this);
    this.closeResults = this.closeResults.bind(this);
    this.deselectPlant = this.deselectPlant.bind(this);
    this.searchPlants = _.debounce(this.searchPlants, 300);
  }

  searchPlants(value) {
    const { relay } = this.props;

    this.setState((state) => {
      if (state.disposable) {
        state.disposable.dispose(); // TO DO: this is not canceling the request, just ignoring server's response
      }

      const disposable = relay.refetch(
        (fragmentVariables) => ({
          count: 10,
          search: value,
        }),
        null,
        (error, se) => {
          if (error) {
            console.error(error);
          }
          this.setState({ isLoading: false, showResults: true });
        }
      );

      return { isLoading: true, disposable };
    });
  }

  handleChangeSearchTerm(e) {
    const { value } = e.target;
    this.setState((state) => ({ searchTerm: value }));

    if (value.length > 4) {
      this.searchPlants(value);
    }
  }

  closeResults() {
    this.setState({
      showResults: false,
    });
  }

  selectPlant(plant) {
    this.setState({
      searchTerm: "",
      showResults: false,
    });
    this.props.onChange(plant);
  }

  deselectPlant() {
    this.props.onChange(null);
  }

  render() {
    const {
      value: selectedPlant,
      classes,
      textFieldProps,
      viewer: {
        allLifeNode: { edges: plants },
      },
    } = this.props;

    const { searchTerm, showResults, isLoading } = this.state;

    return (
      <ClickAwayListener onClickAway={this.closeResults}>
        <div className={classes.selectWraper}>
          {selectedPlant && (
            <List component={Paper}>
              <PlantItem
                plant={selectedPlant}
                classes={classes}
                deselectPlant={this.deselectPlant}
              />
            </List>
          )}

          {!selectedPlant && (
            <TextField
              label="Espécie"
              placeholder="mangifera indica, plinia cauliflora, plinia cauliflora..."
              type="text"
              margin="normal"
              variant="outlined"
              fullWidth
              className={classes.searchField}
              value={searchTerm}
              onChange={this.handleChangeSearchTerm}
              {...textFieldProps}
            />
          )}

          {(showResults || isLoading) && !selectedPlant && (
            <List
              component={Paper}
              className={classes.results}
              onClick={this.closeResults}
            >
              {plants.map(({ node: plant }) => {
                return (
                  <PlantItem
                    key={plant.id}
                    plant={plant}
                    classes={classes}
                    button
                    onClick={this.selectPlant.bind(this, plant)}
                  />
                );
              })}
              {!isLoading && plants.length === 0 && (
                <ListItem>
                  <ListItemText>Nada encontrado com esse nome.</ListItemText>
                </ListItem>
              )}
              {isLoading && (
                <ListItem>
                  <ListItemText>
                    <LinearProgress />
                  </ListItemText>
                </ListItem>
              )}
            </List>
          )}
        </div>
      </ClickAwayListener>
    );
  }
}

function PlantItem(props) {
  const { plant, classes, button, deselectPlant, ...otherProps } = props;
  let mainImage = _.get(plant, "images.edges[0].node");
  return (
    <ListItem button={button} {...otherProps}>
      <ListItemAvatar>
        {mainImage ? (
          <img
            src={mainImage.mainImage.url}
            alt={plant.image}
            className={classes.itemImg}
          />
        ) : (
          <ImgDefault className={classes.itemImg} />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={plant.title}
        secondary={plant.rankDisplay}
        className={classes.itemText}
      />
      {deselectPlant && (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={deselectPlant}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}

const styles = (theme) => ({
  selectWraper: {
    position: "relative",
  },
  searchField: {
    marginTop: 0,
  },
  itemText: {
    paddingLeft: theme.spacing(2),
  },
  itemImg: {
    width: 56,
    height: 56,
    display: "block",
  },
  results: {
    position: "absolute",
    zIndex: 1100,
    width: "100%",
    maxHeight: 400,
    overflow: "auto",
  },
});

const PlantSelectFieldContainer = createRefetchContainer(
  withStyles(styles)(PlantSelectField),
  fragmentSpec,
  refetchQuery
);

export default function ({ environment, ...otherProps }) {
  return (
    <QueryRenderer
      environment={environment}
      query={renderQuery}
      render={({ error, props }) => {
        if (error) {
          return console.error(error);
        } else if (props) {
          return <PlantSelectFieldContainer {...props} {...otherProps} />;
        }
        return <LinearProgress />;
      }}
    />
  );
}
