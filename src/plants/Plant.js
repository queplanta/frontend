import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Paper,
  Grid,
  Hidden,
  Box,
  Link,
  Typography,
  Badge,
  withStyles,
} from "@material-ui/core";
import { Link as RouterLink } from "found";
import { Width } from "../ui";
import _ from "lodash";
import PageTitle from "../lib/PageTitle.js";
import EdibilityBadge from "./EdibilityBadge.js";
import RankDisplay from "./RankDisplay.js";
import RevisionBox from "../revisions/RevisionBox.js";
import NotFound from "../pages/NotFound.js";
import ImgDefault from "./PlantImgDefault.js";
import { TabsRoute, TabRoute } from "../lib/Tabs.js";
import ImageThumbnail from "../lib/ImageThumbnail.js";
import { hasPerm } from "../lib/perms.js";
import SingleHeader from "../lib/SingleHeader.js";
import WishItem from "./buttons/WishItem.js";
import CollectionItem from "./buttons/CollectionItem.js";
import DeleteButton from "../lib/DeleteButton.js";
import PlantDeleteMutation from "./PlantDelete.mutation.js";
import { ToolbarHeaderContext } from "../ToolbarHeaderContext.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function Plant(props) {
  const toolbarContext = useContext(ToolbarHeaderContext);
  const { classes, plant, relay, children } = props;

  useEffect(() => {
    toolbarContext.setToolbarHeader(<SingleHeader>Planta</SingleHeader>);
  }, []);

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
      <BreadcrumbsItem to="/plantas">Plantas</BreadcrumbsItem>
      <BreadcrumbsItem to={`/${plant.slug}-p${plant.idInt}`}>
        Plantas
      </BreadcrumbsItem>
      {commonName ? (
        <PageTitle className={classes.pageTitle}>
          {commonName}{" "}
          <small className={classes.binomialTitle}>{plant.title}</small>
        </PageTitle>
      ) : (
        <PageTitle className={classes.pageTitle}>{plant.title}</PageTitle>
      )}
      <Grid container spacing={3}>
        <Hidden smUp>
          <Grid item xs={12} className={classes.plantActionBar}>
            <CollectionItem plant={plant} />
            <WishItem plant={plant} />
          </Grid>
        </Hidden>
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
          </Paper>
          <Paper className={classes.marginBottom}>
            <RankDisplay plant={plant} />
          </Paper>
          <Paper className={classes.revisionBox}>
            <RevisionBox document={plant.document} objectId={plant.id}>
              {hasPerm(plant, "edit") && (
                <Link to={`${baseUrl}/editar`} component={RouterLink}>
                  editar
                </Link>
              )}
            </RevisionBox>
          </Paper>
          {hasPerm(plant, "delete") && (
            <DeleteButton
              environment={relay.environment}
              node={plant}
              mutation={PlantDeleteMutation}
            />
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          <Hidden xsDown>
            <div className={classes.plantActionBar}>
              <CollectionItem plant={plant} />
              <WishItem plant={plant} />
            </div>
          </Hidden>
          <Paper className={classes.marginBottom}>
            <TabsRoute
              indicatorColor="primary"
              textColor="primary"
              className={classes.tabs}
            >
              <TabRoute label="Descrição" wrapped value={baseUrl} />
              <TabRoute label="Mapa" wrapped value={`${baseUrl}/mapa`} />
              <TabRoute label="Fotos" wrapped value={`${baseUrl}/fotos`} />
              <TabRoute
                label={
                  <Badge
                    color="primary"
                    badgeContent={plant.collectionList.totalCount}
                    classes={{ badge: classes.tabBadge }}
                  >
                    Quem Tem
                  </Badge>
                }
                wrapped
                value={`${baseUrl}/quem-tem`}
              />
              <TabRoute
                label={
                  <Badge
                    color="primary"
                    badgeContent={plant.wishList.totalCount}
                    classes={{ badge: classes.tabBadge }}
                  >
                    Quer ter
                  </Badge>
                }
                wrapped
                value={`${baseUrl}/quem-quer-ter`}
              />
            </TabsRoute>
            <Typography component="div" role="tabpanel">
              <Box p={3}>{children}</Box>
            </Typography>
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
  revisionBox: {
    padding: theme.spacing(2),
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
  plantActionBar: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
  plantActionBtn: {
    margin: theme.spacing(1, 2, 1, 0),
  },
  haveBtn: {
    color: "#FFF",
  },
  createAdBtn: {
    color: "#FFF",
  },
  sidebarBtn: {
    marginBottom: theme.spacing(1),
    textAlign: "left",
  },
  dialog: {
    overflow: "hidden !important",
  },
  dialogContent: {
    padding: theme.spacing(1, 3, 3, 3),
  },
  inlineAvatarList: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  haveListContent: {
    padding: theme.spacing(1),
  },
  haveListAction: {
    textAlign: "right",
    fontSize: "12px",
  },
  tabBadge: {
    right: "-10px",
  },
});

export default withStyles(styles)(Plant);
