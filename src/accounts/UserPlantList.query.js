import graphql from 'babel-plugin-relay/macro';

export const fragmentQuery = graphql`
  fragment UserPlantList_viewer on User
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 30}
    cursor: {type: "String"}
  )
  {
    id
    username
    firstName
    wishList(
      first: $count
      after: $cursor
    ) @connection(key: "UserPlantList_wishList") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          plant {
            id
            ...PlantItem_lifeNode
          }
        }
      }
    }
  }
`

export const fragmentSpec = {
  user: fragmentQuery
}

export const query = graphql`
  query UserPlantListQuery(
    $count: Int!
    $cursor: String,
    $username: String!,
  ) {
    user: userByUsername(username: $username) {
      id
      ...UserPlantList_viewer @arguments(count: $count, cursor: $cursor)
    }
  }
`

export default query
