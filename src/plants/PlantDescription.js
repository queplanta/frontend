import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import TaxoClimb from "./TaxoClimb.js";
import CommentsList from "../comments/CommentsList.js";
import { hasPerm } from "../lib/perms.js";
import CommonNameItem from "./commonNames/CommonNameItem.js";
import CommonNameAdd from "./commonNames/Add.js";

function PlantDescription(props) {
  const { classes, plant, environment } = props;

  return (
    <React.Fragment>
      <Typography variant="body1" className={classes.marginBottom}>
        {plant.description}
      </Typography>

      {(plant.commonNames.edges.length > 0 || hasPerm(plant, "edit")) && (
        <div>
          <Typography variant="h6">Nomes comuns</Typography>
          <ul>
            {plant.commonNames.edges.map((edge) => {
              const commonName = edge.node;
              return (
                <CommonNameItem
                  key={commonName.id}
                  commonName={commonName}
                  plant={plant}
                />
              );
            })}
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
});

export default withStyles(styles)(PlantDescription);
