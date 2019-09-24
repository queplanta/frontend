import graphql from 'react-relay';

export const fragmentQuery = graphql`
  fragment CommentsList_commenting on Commenting
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 30}
    cursor: {type: "String"}
  )
  {
    id
    comments(
      first: $count,
      after: $cursor
    ) @connection(key: "CommentsList_comments") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id,
          ...CommentsItem_comment
        }
      }
    }
  }
`;

export const fragmentSpec = {
  commenting: fragmentQuery
}

export const query = graphql`
  query CommentsListQuery(
    $count: Int!,
    $cursor: String,
    $nodeID: ID!
  ) {
    node(id: $nodeID) {
      ...CommentsList_commenting @arguments(count: $count, cursor: $cursor)
    }
  }
`;
