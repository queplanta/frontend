import graphql from 'babel-plugin-relay/macro';

export const fragmentQuery = graphql`
  fragment UserActivityList_user on User
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 30}
    cursor: {type: "String"}
  )
  {
    id
    username
    actions(
      first: $count,
      after: $cursor
    ) @connection(key: "ListActions_actions") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id,
          ...UserActivityListItem_revision
        }
      }
    }
  }
`;

export const fragmentSpec = {
  user: fragmentQuery
}

export const query = graphql`
  query UserActivityListQuery(
    $count: Int,
    $cursor: String,
    $username: String!,
  ) {
    user: userByUsername(username: $username) {
      id
      username
      ...UserActivityList_user @arguments(count: $count, cursor: $cursor)
    }
  }
`;

export default query