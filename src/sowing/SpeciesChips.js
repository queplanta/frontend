import React, { useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogImage: {
    width: "100%",
    maxHeight: 240,
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
}));

function SpeciesChips({
  species,
  enableDetails = false,
  chipClassName,
  containerClassName,
}) {
  const classes = useStyles();
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const handleClose = () => setSelectedSpecies(null);

  const handleChipClick = (item) => {
    if (!enableDetails) return;
    if (!item.description && !item.image) return;
    setSelectedSpecies(item);
  };

  return (
    <div className={containerClassName}>
      {species.map((item, idx) => (
        <Chip
          key={item.id || item.name || idx}
          label={item.name || item.id}
          className={chipClassName}
          clickable={enableDetails && (!!item.description || !!item.image)}
          onClick={enableDetails ? () => handleChipClick(item) : undefined}
        />
      ))}
      <Dialog
        open={!!selectedSpecies}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        {selectedSpecies && (
          <>
            <DialogTitle>
              {selectedSpecies.name || selectedSpecies.id}
            </DialogTitle>
            <DialogContent>
              {selectedSpecies.image && (
                <img
                  src={selectedSpecies.image}
                  alt={`Foto de ${selectedSpecies.name || "espécie"}`}
                  className={classes.dialogImage}
                />
              )}
              {selectedSpecies.description && (
                <Typography variant="body1" component="p">
                  {selectedSpecies.description}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Fechar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default SpeciesChips;
