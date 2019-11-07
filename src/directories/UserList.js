import React from 'react';
import Helmet from 'react-helmet';
import { createPaginationContainer } from 'react-relay';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { fragmentSpec, query } from './UserList.query.js';
import UserListItem from './UserListItem.js';

function UserList(props) {
  const {classes, relay, viewer: {allUsers: {edges: users}}} = props
  const [isLoading, setLoading] = React.useState(false)
  const hasMore = relay.hasMore()

  function handleLoadMore() {
    if (!hasMore || relay.isLoading()) {
      return;
    }

    setLoading(true)
    relay.loadMore(props.count, (error) => {
      if (error) console.error(error);
      setLoading(false)
    })
  }

  let listItems = (
    <Grid item xs={12}>
      <Typography component="div" className={classes.emptyText} variant="body2">Nenhum membro encontrado.</Typography>
    </Grid>
  )
  if (users.length > 0) {
    listItems = users.map(({node: user}) => {
      return <UserListItem key={user.id} user={user} />
    })
  }

  return <React.Fragment>
    <Grid container spacing={3} alignItems="flex-start">
      {listItems}
    </Grid>
    <div className={classes.wrapBtn}>
      <ButtonWithProgress disabled={!hasMore} fullWidth={true} variant="outlined" isLoading={isLoading} onClick={handleLoadMore}>{(!hasMore) ? 'Fim' : 'Ver mais membros'}</ButtonWithProgress>
    </div>
  </React.Fragment>
}

const styles = (theme) => ({
  wrapBtn: {
    padding: theme.spacing(3, 0),
  },
  actionRoot: {
    right: theme.spacing(2),
  },
  emptyText: {
    padding: theme.spacing(3),
    textAlign: 'center'
  },  
})

export default createPaginationContainer(
  withStyles(styles)(UserList) ,
  fragmentSpec,
  {
    direction: 'forward',
    query: query,
    getConnectionFromProps(props) {
      return props.viewer.allUsers;
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        ...paginationInfo,
      }
    }
  },
)