import graphql from 'babel-plugin-relay/macro';

export const fragmentQuery = graphql`
  fragment PostList_viewer on Query
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 30}
    cursor: {type: "String"}
  )
  {
    allPosts(
      first: $count
      after: $cursor
    ) @connection(key: "Blog_allPosts") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          ...PostItem_post
        }
      }
    }
  }
`

export const fragmentSpec = {
  viewer: fragmentQuery
}

export const query = graphql`
  query PostListQuery(
    $count: Int!
    $cursor: String
  ) {
    viewer {
      ...PostList_viewer @arguments(count: $count, cursor: $cursor)
    }
  }
`

export default query