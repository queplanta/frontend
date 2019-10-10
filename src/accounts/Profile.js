import React from 'react';
import Helmet from 'react-helmet';
import { IconButton, Paper, Dialog, 
  List, ListItem, ListItemText, Typography, Grid,
  Chip, Box, Slide, useMediaQuery, withStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTheme } from '@material-ui/core/styles';
import NotFound from '../pages/NotFound.js'
import Link from '../lib/Link.js';
import DialogTitle from '../lib/DialogTitle.js';
import { Width } from '../ui';
import { TabsRoute, TabRoute } from '../lib/Tabs.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Profile(props) {
  const {classes, children, me, user: profile} = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!profile) {
    return <NotFound />
  }
  const baseUrl = `/u/${profile.username}`;


  return <Width>
    <Helmet
      title={profile.username}
    />
    <Grid container spacing={3}>
      <Grid className={classes.textAlignCenter} item xs={4} md={2}>
        <img
          alt={profile.username}
          image={profile.avatar}
          src={profile.avatar.url}
          className={classes.profileImage}
        />
        {(me !== null && me.id === profile.id) && <div><Link className={classes.smallLink} to={`/conta/editar/avatar`}>Alterar foto</Link></div>}
      </Grid>
      <Grid item xs={8} md={10}>
        {(me !== null && me.id === profile.id) && <div>
          <IconButton
            className={classes.editMdButton}
            onClick={handleClickOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} TransitionComponent={Transition}>
            <DialogTitle id="simple-dialog-title" onClose={handleClose}>Configuração de conta</DialogTitle>
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
        </div>}
        <Typography
          color="textPrimary"
          component="h1"
          variant="h6"
          className={classes.username}
        >
          <span style={{marginRight: 10}}>{profile.username}</span>
          <Chip
            size="small"
            label={`Reputação: ${profile.reputation}`}
            className={classes.chip}
            color="primary"
            variant="outlined"
          />
        </Typography>
        {(me !== null && me.id === profile.id) && <Link className={classes.smallLink} to={`/conta/editar`}>Editar perfil</Link>}
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.marginBottom}>
          <TabsRoute
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabs}
          >
            <TabRoute label="Atividades" wrapped value={baseUrl} />
          </TabsRoute>
          <Typography
            component="div"
            role="tabpanel"
          >
            <Box p={3}>{children}</Box>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Width>;
}

const styles = (theme) => ({
  textAlignCenter: {
    textAlign: 'center',
  },
  smallLink: {
    fontSize: 12,
  },
  profileImage: {
    // margin: 10,
    width: 80,
    height: 80,
  },
  bigProfileImage: {
    width: 80,
    height: 80,
  },
  username: {
    marginBottom: theme.spacing(1)
  },
  chip: {
    fontSize: 11,
    marginBottom: theme.spacing(1)
  },
  editMdButton: {
    float: 'right'
  }
})

export default withStyles(styles)(Profile)