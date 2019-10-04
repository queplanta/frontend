import React from 'react';
// import Helmet from 'react-helmet';
import { Typography, withStyles } from '@material-ui/core';
// import _ from 'lodash';
import TaxoClimb from './TaxoClimb.js';
import CommentsList from '../comments/CommentsList.js';
import VotingButtons from '../voting/VotingButtons.js';


function PlantDescription(props) {
  const {classes, plant} = props

  return <React.Fragment>
    <Typography variant="body1" className={classes.marginBottom}>{plant.description}</Typography>
    
    {plant.commonNames.edges.length > 0 && <React.Fragment>
      <Typography variant="h6">Nomes comuns</Typography>
      <ol>
        {plant.commonNames.edges.map((edge) => {
          const commonName = edge.node
          return <li key={commonName.id}>
            { commonName.name} {commonName.language ? `(${commonName.language})` : ''} <VotingButtons voting={commonName.voting} parentId={commonName.id} />
          </li>
        })}
      </ol>
    </React.Fragment>}
    <TaxoClimb lifeNode={plant} />
    <CommentsList commenting={plant.commenting} />
  </React.Fragment>
}

const styles = (theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
})

export default withStyles(styles)(PlantDescription)
