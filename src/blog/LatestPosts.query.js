import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  fragment LatestPosts_viewer on Query {
    allPosts(first: 20) {
      edges {
        node {
          id
          url,
          title,
          publishedAt,
          commenting {
            count
          }
          voting {
            countUps
            countDowns
          }
          tags(first: 50) {
            edges {
              node {
                title
                slug
              }
            }
          }
          revisionCreated {
            author {
              ...ProfileLink_user
            }
          }
        }
      }
    }
  }
`;
export default query
