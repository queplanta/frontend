import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import TaxoClimb from './TaxoClimb.js';
import CommentsList from '../comments/CommentsList.js';
import VotingButtons from '../voting/VotingButtons.js';
import { hasPerm } from '../lib/perms.js';
// import PlantEditAddName from './PlantEditAddName.js';

function PlantDescription(props) {
  const {classes, plant} = props

  return <React.Fragment>
    <Typography variant="body1" className={classes.marginBottom}>{plant.description}</Typography>
    
    {(plant.commonNames.edges.length > 0 || hasPerm(plant, 'edit')) && <div>
      <Typography variant="h6">Nomes comuns</Typography>
      <ul>
        {plant.commonNames.edges.map((edge) => {
          const commonName = edge.node
          return <li key={commonName.id}>
            { commonName.name} {commonName.language ? `(${commonName.language})` : ''} {hasPerm(plant, 'edit') && <VotingButtons voting={commonName.voting} parentId={commonName.id} />}
          </li>
        })}
        {/*hasPerm(plant, 'edit') && <li><PlantEditAddName plant={plant} /></li>*/}
      </ul>
    </div>}
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
