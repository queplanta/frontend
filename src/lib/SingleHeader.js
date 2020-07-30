import React from "react";
import { Typography, Toolbar, withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useRouter } from "found";
import HeaderMenu from "../HeaderMenu.js";

function SingleHeader(props) {
  const { router } = useRouter();
  const { children, classes } = props;

  return (
    <Toolbar>
      <IconButton
        aria-label="back"
        edge="start"
        className={classes.backButton}
        onClick={() =>
          window.history.length ? window.history.go(-1) : router.push("/")
        }
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        {children}
      </Typography>
      <HeaderMenu />
    </Toolbar>
  );
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    paddingRight: 65,
  },
  backButton: {
    color: "#FFFFFF",
  },
  title: {
    flexGrow: 1,
  },
});

export default withStyles(styles)(SingleHeader);
