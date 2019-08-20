import React from 'react';
import { Typography, Paper, CircularProgress, withStyles } from '@material-ui/core';
import { QueryRenderer, createPaginationContainer } from 'react-relay';
import { fragmentQuery, query } from './LatestWhatIsThis.query.js';
import WhatIsThis from './WhatIsThis.js'
// import AddIdentify from './AddIdentify.js';

function WhatIsThisList(props) {
  const {classes, viewer: {allWhatIsThis: {edges: items}}, environment} = props;
  return <div className={classes.wrapper}>
    {items.map((edge) => {
      return <WhatIsThis key={edge.node.id} occurrence={edge.node} environment={environment} />
    })}
  </div>
}

const WhatIsThisListStyled = withStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2, 2, 0.1, 2),
  },
}))(WhatIsThisList)

const WhatIsThisListPaginated = createPaginationContainer(
  WhatIsThisListStyled,
  fragmentQuery,
  {
    direction: 'forward',
    query: query,
    getConnectionFromProps(props) {
      return props.viewer.allWhatIsThis;
    },
    getVariables(props, {count, after}, fragmentVariables) {
      return {
        count,
        after
      }
    }
  },
)

const LatestWhatIsThis = ({classes, environment}) => {
  return <Paper className={classes.root}>
    <Typography component="h3" variant="h5" className={classes.title}>Últimos pedidos de identificação</Typography>
    {/*<AddIdentify environment={environment} />*/}
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{
        count: 10,
        after: '',
      }}
      render={({error, props}) => {
        if (error) {
          return <div><h1>Error!</h1><br />{error}</div>;
        }

        if (props) {
          return <WhatIsThisListPaginated {...props} environment={environment} />
        }

        return <div className={classes.loading}><CircularProgress /></div>
      }}
    />
  </Paper>
}

const styles = (theme) => ({
  root: {
  },
  loading: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  actionRoot: {
    right: theme.spacing(2),
  },
})

export default withStyles(styles)(LatestWhatIsThis)
