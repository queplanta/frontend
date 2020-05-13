import React from "react";
import { Helmet } from "react-helmet";
import {
  IconButton,
  Paper,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Avatar,
  Chip,
  Box,
  Slide,
  useMediaQuery,
  withStyles,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useTheme } from "@material-ui/core/styles";
import NotFound from "../pages/NotFound.js";
import Link from "../lib/Link.js";
import DialogTitle from "../lib/DialogTitle.js";
import { Width } from "../ui";
import { TabsRoute, TabRoute } from "../lib/Tabs.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Profile(props) {
  const { classes, children, me, user: profile } = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!profile) {
    return <NotFound />;
  }

  const baseUrl = `/u/${profile.username}`;
  const isMe = me !== null && me.id === profile.id;

  return (
    <Width>
      <Helmet title={`${profile.firstName} (${profile.username}) | Membros`} />
      <Grid container spacing={3}>
        <Grid className={classes.textAlignCenter} item xs={4} md={2}>
          <Avatar
            alt={profile.username}
            src={profile.avatar.url}
            className={classes.profileImage}
          />
          {isMe && (
            <div>
              <Link className={classes.smallLink} to={`/conta/editar/avatar`}>
                Alterar foto
              </Link>
            </div>
          )}
        </Grid>
        <Grid item xs={8} md={7}>
          {isMe && (
            <div>
              <IconButton
                className={classes.editMdButton}
                onClick={handleClickOpen}
              >
                <MoreVertIcon />
              </IconButton>
              <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
              >
                <DialogTitle id="simple-dialog-title" onClose={handleClose}>
                  Configuração de conta
                </DialogTitle>
                <List>
                  <ListItem button to={`/conta/editar`} component={Link}>
                    <ListItemText primary="Editar Perfil" />
                  </ListItem>
                  <ListItem button to={`/conta/editar/senha`} component={Link}>
                    <ListItemText primary="Alterar senha" />
                  </ListItem>
                  <ListItem button to={`/conta/editar/avatar`} component={Link}>
                    <ListItemText primary="Alterar imagem de exibição" />
                  </ListItem>
                </List>
              </Dialog>
            </div>
          )}
          <Typography
            color="textPrimary"
            component="h1"
            variant="h6"
            className={classes.username}
          >
            <span style={{ marginRight: 10 }}>
              {profile.firstName || profile.username}
            </span>
          </Typography>
          <Typography variant="caption" component="div">
            queplanta.com/u/{profile.username}
          </Typography>
          <Chip
            size="small"
            label={`Reputação: ${profile.reputation}`}
            className={classes.chip}
            color="primary"
            variant="outlined"
          />
          {isMe && (
            <div>
              <Link className={classes.smallLink} to={`/conta/editar`}>
                Editar perfil
              </Link>
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <div className={classes.myPlantsWrapper}>
            <div className={classes.myPlantsTitle}>Minhas Plantas</div>
            <Link to={`${baseUrl}/tenho`} className={classes.myPlantsColumn}>
              <span>{profile.collectionList.totalCount}</span>
              <small>Tenho</small>
            </Link>
            <Link
              to={`${baseUrl}/quero-ter`}
              className={classes.myPlantsColumn}
            >
              <span>{profile.wishList.totalCount}</span>
              <small>Quero Ter</small>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.marginBottom}>
            <TabsRoute
              indicatorColor="primary"
              textColor="primary"
              className={classes.tabs}
              centered={true}
            >
              <TabRoute label="Atividades" wrapped value={baseUrl} />
              <TabRoute label="Tenho" wrapped value={`${baseUrl}/tenho`} />
              <TabRoute
                label="Quero Ter"
                wrapped
                value={`${baseUrl}/quero-ter`}
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
  textAlignCenter: {
    textAlign: "center",
  },
  smallLink: {
    fontSize: 12,
  },
  profileImage: {
    width: 163,
    height: "auto",
    maxWidth: "100%",
  },
  chip: {
    fontSize: 11,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  editMdButton: {
    float: "right",
  },
  myPlantsWrapper: {
    border: "1px solid green",
    borderRadius: "10px",
    textAlign: "center",
    padding: "10px 10px 20px 10px",
  },
  myPlantsTitle: {
    background: "green",
    color: "white",
    margin: "-10px -10px 10px -10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    padding: 5,
  },
  myPlantsColumn: {
    width: "50%",
    display: "inline-block",
    color: "#252525",
    "&:hover": {
      textDecoration: "none",
    },
    "& > span": {
      display: "block",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      textShadow: "2px 2px 2px rgba(121, 185, 124, .9)",
    },
    "& > small": {
      background: "#79b97c",
      padding: "5px 6px",
      borderRadius: "5px",
      fontWeight: "bold",
      fontSize: 16,
    },
    "&:hover > small": {
      background: "rgba(121, 185, 124, 0.6)",
    },
  },
});

export default withStyles(styles)(Profile);
