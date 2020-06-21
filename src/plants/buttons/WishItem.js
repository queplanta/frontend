import React, { useState } from "react";
import { createFragmentContainer } from "react-relay";
import { withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useSnackbar } from "notistack";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import ButtonWithProgress from "../../lib/ButtonWithProgress.js";
import { useLoginRequired } from "../../accounts/LoginRequired.js";
import WishItemAddMutation from "./WishItemAdd.mutation.js";
import WishItemDeleteMutation from "./WishItemDelete.mutation.js";
import fragmentSpec from "./WishItemToggle.query.js";

function WishItem(props) {
  const {
    relay: { environment },
    classes,
    plant,
    ...otherProps
  } = props;
  const { isAuthenticated } = useLoginRequired();
  const { enqueueSnackbar } = useSnackbar();
  const { trackEvent } = useMatomo();
  const [isSaving, setIsSaving] = useState(false);
  const isSelected = plant.myWishItem !== null;

  function handleAdd(e) {
    e.preventDefault();
    setIsSaving(true);
    if (isAuthenticated()) {
      if (!isSelected) {
        WishItemAddMutation.commit(
          environment,
          {
            plantId: plant.id,
          },
          {
            onSuccess: () => {
              enqueueSnackbar(
                `${plant.title} adicionado(a) com sucesso a sua lista de "Quero ter"`,
                { variant: "success" }
              );
              setIsSaving(false);
              trackEvent({
                category: "my-plants",
                action: "wish",
                name: "add",
              });
            },
            onError: () => {
              enqueueSnackbar("Ocorreu um erro", { variant: "error" });
              setIsSaving(false);
            },
          }
        );
      } else {
        WishItemDeleteMutation.commit(
          environment,
          {
            id: plant.myWishItem.id,
          },
          {
            onSuccess: () => {
              enqueueSnackbar(
                `${plant.title} removido(a) com sucesso da sua lista de "Quero ter"`,
                { variant: "success" }
              );
              setIsSaving(false);
              trackEvent({
                category: "my-plants",
                action: "wish",
                name: "remove",
              });
            },
            onError: () => {
              enqueueSnackbar("Ocorreu um erro", { variant: "error" });
              setIsSaving(false);
            },
          }
        );
      }
    }
  }

  return (
    <ButtonWithProgress
      variant="contained"
      color="secondary"
      size="small"
      className={isSelected ? classes.active : classes.root}
      isLoading={isSaving}
      onClick={handleAdd}
      {...otherProps}
    >
      <AddIcon className={classes.leftIcon} /> Quero ter
    </ButtonWithProgress>
  );
}

const styles = (theme) => ({
  root: {
    backgroundColor: "#b6c6d6",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#6197ce",
    },
  },
  active: {
    backgroundColor: "#1976d2",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#0f5192",
    },
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
});

export default createFragmentContainer(
  withStyles(styles)(WishItem),
  fragmentSpec
);
