import React from 'react';
import { List, withStyles } from '@material-ui/core';
import { createPaginationContainer } from 'react-relay';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import UserActivityListItem from './UserActivityListItem.js';
import { fragmentSpec, query } from './UserActivityList.query.js';

function UserActivityList(props) {
  const {classes, relay, user: {actions: {edges: actions}}} = props
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

  return <React.Fragment>
    <List>
      {actions.map(({node: action}) => {
        return <UserActivityListItem key={action.id} revision={action} />
      })}
    </List>
    <div className={classes.wrapBtn}>
      <ButtonWithProgress disabled={!hasMore} fullWidth={true} variant="outlined" isLoading={isLoading} onClick={handleLoadMore}>{(!hasMore) ? 'Fim das atividades' : 'Carregar mais atividades'}</ButtonWithProgress>
    </div>
  </React.Fragment>
}

const styles = (theme) => ({
  wrapBtn: {
    padding: theme.spacing(2, 0),
  }
})

export default createPaginationContainer(
  withStyles(styles)(UserActivityList) ,
  fragmentSpec,
  {
    direction: 'forward',
    query: query,
    getConnectionFromProps(props) {
      return props.user.actions;
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        ...paginationInfo,
        username: fragmentVariables.username
      }
    }
  },
)