import React, { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  Grid,
  Chip,
  ListItem,
  ListItemText,
  ListItemAvatar,
  MenuItem,
  ListItemIcon,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { fade } from "@material-ui/core/styles";
import clsx from "clsx";
import { createFragmentContainer } from "react-relay";
import { useSnackbar } from "notistack";
import { RelativeDate } from "../../ui";
import fragmentSpec from "./SuggestionItem.query.js";
import ProfileLink from "../../accounts/ProfileLink.js";
import PlantLink from "../../plants/PlantLink.js";
import VotingButtons from "../../voting/VotingButtons.js";
import DeleteButton from "../../lib/DeleteButton.js";
import MenuButton from "../../lib/MenuButton.js";
import ButtonWithProgress from "../../lib/ButtonWithProgress.js";
import { hasPerm } from "../../lib/perms.js";
import SuggestionIDDeleteMutation from "./SuggestionDelete.mutation.js";
import WhatIsThisIdentifyMutation from "./WhatIsThisIdentify.mutation.js";

function SuggestionItem(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { classes, relay, occurrence, suggestionID: suggestion } = props;
  const menuRef = useRef();
  const [isSaving, setIsSaving] = useState(false);

  function handleVerify() {
    setIsSaving(true);
    WhatIsThisIdentifyMutation.commit(
      relay.environment,
      {
        id: occurrence.id,
        lifeId: suggestion.identity.id,
      },
      {
        onSuccess: () => {
          enqueueSnackbar("Identificada com sucesso.", { variant: "success" });
          setIsSaving(false);
        },
        onError: () => {
          enqueueSnackbar("Ocorreu um erro", { variant: "error" });
          setIsSaving(false);
        },
      }
    );
  }

  // verified_user
  // check_circle
  // check_circle_outline
  const isVerified =
    occurrence.identity &&
    suggestion.identity &&
    occurrence.identity.id === suggestion.identity.id;

  return (
    <ListItem
      className={clsx(classes.listItem, { [classes.correctItem]: isVerified })}
    >
      <ListItemAvatar className={classes.avatar}>
        <Avatar
          alt={suggestion.author.username}
          src={suggestion.author.avatar.url}
        />
      </ListItemAvatar>
      <ListItemText className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <ProfileLink
              style={{ fontWeight: "bold" }}
              user={suggestion.author}
              hideAvatar={true}
            />
            <Typography
              style={{ marginLeft: "6px" }}
              component="span"
              color="textSecondary"
            >
              sugeriu:
            </Typography>
            <Typography variant="caption" component="div" color="textSecondary">
              <RelativeDate
                prefix="Publicado"
                date={suggestion.revisionCreated.createdAt}
              />
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.secondaryAction}>
            <MenuButton className={classes.menuButton} ref={menuRef}>
              {hasPerm(suggestion, "delete") && (
                <DeleteButton
                  component={MenuItem}
                  environment={relay.environment}
                  node={suggestion}
                  mutation={SuggestionIDDeleteMutation}
                >
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText>Excluir</ListItemText>
                </DeleteButton>
              )}
            </MenuButton>
          </Grid>
          <Grid item xs={12} className={classes.gridContent}>
            {isVerified && (
              <Chip
                icon={<DoneIcon className={classes.correctIcon} />}
                label="Identificada"
                size="small"
                className={classes.correct}
              />
            )}
            <Card className={classes.card}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    <PlantLink plant={suggestion.identity} />
                  </Typography>
                }
                subheader={
                  <Typography variant="caption">
                    {suggestion.identity.rankDisplay}
                  </Typography>
                }
              />
            </Card>
            {suggestion.notes && (
              <Typography variant="body2">{suggestion.notes}</Typography>
            )}
          </Grid>
          <Grid item xs={12} className={classes.bottomAction}>
            <VotingButtons
              voting={suggestion.voting}
              parentId={suggestion.id}
            />
            {hasPerm(occurrence, "identify") && (
              <ButtonWithProgress
                variant="outlined"
                color="primary"
                isLoading={isSaving}
                onClick={handleVerify}
                component={IconButton}
                disabled={isVerified}
              >
                <CheckCircleOutlineIcon />
              </ButtonWithProgress>
            )}
          </Grid>
        </Grid>
      </ListItemText>
    </ListItem>
  );
}

const styles = (theme) => ({
  avatar: {
    marginTop: "4px",
  },
  listItem: {
    alignItems: "start",
  },
  correctItem: {
    backgroundColor: fade(theme.palette.primary.main, 0.15),
  },
  correct: {
    background: "#4caf50",
    color: "#FFF",
    marginBottom: theme.spacing(2),
  },
  correctIcon: {
    color: "#FFF",
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: theme.spacing(2),
  },
  gridContent: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  secondaryAction: {
    textAlign: "right",
  },
  menuButton: {
    marginTop: "-12px",
    marginRight: "-24px",
  },
  bottomAction: {
    textAlign: "right",
  },
});
export default createFragmentContainer(
  withStyles(styles)(SuggestionItem),
  fragmentSpec
);
