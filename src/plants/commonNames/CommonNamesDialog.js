import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  withStyles,
} from "@material-ui/core";
import { createFragmentContainer } from "react-relay";
import fragmentSpec from "./CommonNamesDialog.query.js";
import CommonNameItem from "./CommonNameItem.js";

function CommonNamesDialog(props) {
  const { plant, onClose } = props;

  return (
    <Dialog open={true} onClose={onClose} scroll="body">
      <DialogTitle>Nomes Comuns</DialogTitle>
      <DialogContent>
        <ul>
          {plant.allCommonNames.edges.map((edge) => {
            const commonName = edge.node;
            return (
              <CommonNameItem
                key={commonName.id}
                commonName={commonName}
                plant={plant}
                showLanguage
              />
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export default createFragmentContainer(CommonNamesDialog, fragmentSpec);
