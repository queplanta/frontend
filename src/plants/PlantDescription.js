import React, { useState } from "react";
import { Button, Badge, Typography, withStyles } from "@material-ui/core";
import TaxoClimb from "./TaxoClimb.js";
import CommentsList from "../comments/CommentsList.js";
import { hasPerm } from "../lib/perms.js";
import CommonNameItem from "./commonNames/CommonNameItem.js";
import CommonNameAdd from "./commonNames/Add.js";
import CommonNamesDialog from "./commonNames/CommonNamesDialog.js";

function PlantDescription(props) {
  const { classes, plant, environment } = props;
  const [openCommonNames, setOpenCommonNames] = useState(false);

  const onOpenCommonNames = () => {
    setOpenCommonNames(true);
  };

  const onCloseCommonNames = () => {
    setOpenCommonNames(false);
  };

  return (
    <React.Fragment>
      <Typography variant="body1" className={classes.marginBottom}>
        {plant.description}
      </Typography>

      {(plant.commonNames.edges.length > 0 || hasPerm(plant, "edit")) && (
        <div>
          <Typography variant="h6">Nomes comuns</Typography>
          <ul className={classes.list}>
            {plant.commonNames.edges.map((edge) => {
              const commonName = edge.node;
              return (
                <CommonNameItem
                  className={classes.commonNameItem}
                  key={commonName.id}
                  commonName={commonName}
                  plant={plant}
                />
              );
            })}
            {plant.commonNamesStats.totalCount >
              plant.commonNames.edges.length && (
              <li>
                <Badge
                  badgeContent={plant.commonNamesStats.totalCount}
                  color="primary"
                >
                  <Button variant="outlined" onClick={onOpenCommonNames}>
                    Ver todos
                  </Button>
                </Badge>
                {openCommonNames && (
                  <CommonNamesDialog
                    plant={plant}
                    onClose={onCloseCommonNames}
                  />
                )}
              </li>
            )}
            {hasPerm(plant, "edit") && (
              <li>
                <CommonNameAdd plant={plant} environment={environment} />
              </li>
            )}
          </ul>
        </div>
      )}
      <TaxoClimb lifeNode={plant} />
      <CommentsList commenting={plant.commenting} />
    </React.Fragment>
  );
}

const styles = (theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  list: {
    padding: 0,
    marginTop: 0,
    "& li": {
      display: "inline-block",
      marginRight: theme.spacing(2),
    },
  },
  commonNameItem: {
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: "rgba(204, 204, 204, 0.2)",
      borderRadius: 4,
    },
  },
});

export default withStyles(styles)(PlantDescription);
