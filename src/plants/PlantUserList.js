import React from "react";
import { Helmet } from "react-helmet";
import clsx from "clsx";
import {
  Avatar,
  Dialog,
  Paper,
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Hidden,
  Box,
  Link,
  Slide,
  useMediaQuery,
  Typography,
  withStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import WebIcon from "@material-ui/icons/Web";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { useTheme } from "@material-ui/core/styles";
import { Link as RouterLink } from "found";
import { Width } from "../ui";
import _ from "lodash";
import PageTitle from "../lib/PageTitle.js";
import EdibilityBadge from "./EdibilityBadge.js";
import RankDisplay from "./RankDisplay.js";
import RevisionBox from "../revisions/RevisionBox.js";
import NotFound from "../pages/NotFound.js";
import ImgDefault from "./PlantImgDefault.js";
import DialogTitle from "../lib/DialogTitle.js";
import { TabsRoute, TabRoute } from "../lib/Tabs.js";
import ImageThumbnail from "../lib/ImageThumbnail.js";
import { hasPerm } from "../lib/perms.js";

function Plant(props) {
  const { classes, plant, children } = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!plant) {
    return <NotFound />;
  }

  const baseUrl = `/${plant.slug}-p${plant.idInt}`;
  const mainImage = _.get(plant, "mainImage.edges[0].node");

  const commonName = _.get(plant, "commonName.name");

  let pageTitle = plant.title;
  if (commonName) {
    pageTitle = `${pageTitle} (${commonName})`;
  }

  return (
    <Width>
      <Helmet title={pageTitle} />
      {commonName ? (
        <PageTitle className={classes.pageTitle}>
          {commonName}{" "}
          <small className={classes.binomialTitle}>{plant.title}</small>
        </PageTitle>
      ) : (
        <PageTitle className={classes.pageTitle}>{plant.title}</PageTitle>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper className={classes.root}>
            <div>
              {mainImage ? (
                <ImageThumbnail
                  alt={plant.title}
                  image={mainImage}
                  src={mainImage.smallImage.url}
                  className={classes.mainImage}
                />
              ) : (
                <ImgDefault alt={plant.title} className={classes.mainImage} />
              )}
            </div>
            <EdibilityBadge plant={plant} />
            <Hidden smUp>
              <Button
                variant="contained"
                color="primary"
                className={classes.sidebarBtn}
                fullWidth={true}
              >
                <PlaylistAddIcon className={classes.leftIcon} />
                Adicionar à lista
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.sidebarBtn}
                fullWidth={true}
                onClick={handleClickOpen}
              >
                <AddIcon className={classes.leftIcon} />
                Tenho semente
              </Button>
            </Hidden>
          </Paper>
          <Paper className={classes.marginBottom}>
            <RankDisplay plant={plant} />
          </Paper>
          <Paper className={classes.root}>
            <RevisionBox document={plant.document} objectId={plant.id}>
              {hasPerm(plant, "edit") && (
                <Link to={`${baseUrl}/editar`} component={RouterLink}>
                  editar
                </Link>
              )}
            </RevisionBox>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper className={classes.paper}>
            lista de users igual diretorios
          </Paper>
        </Grid>
      </Grid>
    </Width>
  );
}

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  pageTitle: {
    textTransform: "capitalize",
  },
  binomialTitle: {
    color: "#797979",
  },
  mainImage: {
    width: "100%",
  },
  tabs: {
    padding: theme.spacing(1),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  plantActionBtn: {
    margin: theme.spacing(1, 0, 1, 1),
  },
  haveBtn: {
    color: "#FFF",
  },
  wantToHaveBtn: {
    backgroundColor: "#1976d2",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#0f5192",
    },
  },
  createAdBtn: {
    color: "#FFF",
  },
  sidebarBtn: {
    marginBottom: theme.spacing(1),
    textAlign: "left",
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  dialog: {
    overflow: "hidden !important",
  },
  dialogContent: {
    padding: theme.spacing(1, 3, 3, 3),
  },
});

export default withStyles(styles)(Plant);
