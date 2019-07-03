import React from 'react';
import { createFragmentContainer } from 'react-relay';
import { Table, TableBody, TableRow, TableCell, withStyles } from '@material-ui/core';
import PlantLink from './PlantLink';
import query from './RankDisplay.query.js';

function RankDisplay(props) {
  const {classes, plant} = props;
  return<div>
    <Table className={classes.table} size="small">
      <TableBody>
        <TableRow>
          <TableCell classes={{body: classes.rankBody}}>{plant.rankDisplay}:</TableCell>
          <TableCell>{plant.title}</TableCell>
        </TableRow>
        {plant.parents.map(row => (
          <TableRow key={row.id}>
            <TableCell classes={{body: classes.rankBody}}>{row.rankDisplay}:</TableCell>
            <TableCell><PlantLink plant={row} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
}

const styles = (theme) => ({
  rankBody: {
    textAlign: "right",
  }
})

export default createFragmentContainer(
  withStyles(styles)(RankDisplay),
  query
);