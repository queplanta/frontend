import React from "react";
import { QueryRenderer, createRefetchContainer } from "react-relay";
import {
  TextField,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  LinearProgress,
  CircularProgress,
  IconButton,
  withStyles,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
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

    this.openResults = this.openResults.bind(this);
    this.closeResults = this.closeResults.bind(this);
    this.selectPlant = this.selectPlant.bind(this);
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
          this.setState({ ...state, isLoading: false, showResults: true });
        }
      );

      return { ...state, isLoading: true, disposable };
    });
  }

  openResults() {
    const {
      viewer: {
        allLifeNode: { edges: plants },
      },
    } = this.props;
    if (plants.length) {
      this.setState((state) => ({
        ...state,
        showResults: true,
      }));
    }
  }

  closeResults() {
    this.setState((state) => ({
      ...state,
      showResults: false,
    }));
  }

  selectPlant(plant) {
    this.setState((state) => ({
      ...state,
      searchTerm: "",
      showResults: false,
    }));
    this.props.onChange(plant);
  }

  componentDidUpdate(_, prevState) {
    const { value: selectedPlant } = this.props;

    if (prevState.searchTerm !== this.state.searchTerm) {
      if (this.state.searchTerm.length > 4 && !selectedPlant) {
        this.searchPlants(this.state.searchTerm);
      }
    }
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
      <>
        <Autocomplete
          value={selectedPlant}
          onChange={(e, newSelectedPlant) => this.selectPlant(newSelectedPlant)}
          inputValue={searchTerm}
          onInputChange={(e, newInputValue) =>
            this.setState((state) => ({ ...state, searchTerm: newInputValue }))
          }
          open={showResults}
          onOpen={() => this.openResults()}
          onClose={() => this.closeResults()}
          loading={isLoading}
          options={plants}
          getOptionSelected={(option, value) =>
            option.node.title === value.node.title
          }
          getOptionLabel={(option) => option.node.title}
          renderOption={({ node: plant }) => (
            <PlantItem key={plant.id} plant={plant} classes={classes} />
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              {...textFieldProps}
              placeholder="mangifera indica, plinia cauliflora, plinia cauliflora..."
              fullWidth
              margin="normal"
              type="text"
              label="Espécie"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </>
    );
  }
}

function PlantItem(props) {
  const { plant, classes, deselectPlant } = props;
  let mainImage = _.get(plant, "images.edges[0].node");
  return (
    <>
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
    </>
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
