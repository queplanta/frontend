import graphql from 'babel-plugin-relay/macro';

const query = graphql `
  fragment CommentsList_commenting on Commenting {
    count,
    comments(first: 50) {
      edges {
        node {
          id
          ...CommentsItem_comment
        }
      }
    }
  }
`;
export default query