import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query PostQuery($url: String!) {
    post: postByUrl(url: $url) {
      id,
      url,
      title,
      body,
      publishedAt,
      myPerms,
      document {
        revisionsCount
      },
      tags(first: 50) {
        edges {
          node {
            id,
            slug,
            title,
          }
        }
      },
      revisionCreated {
        author {
          ...ProfileLink_user
        }
      },
      voting {
        ...VotingButtons_voting
      }
      commenting {
        ...CommentsList_commenting
      }
    }
  }
`;
export default query
