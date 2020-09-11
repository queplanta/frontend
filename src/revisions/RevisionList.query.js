import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query RevisionListQuery($nodeID: ID!) {
    node(id: $nodeID) {
      id
      __typename

      ... on DocumentNode {
        idInt
        revisions {
          edges {
            node {
              id
              idInt
              index
              type
              typeDisplay
              isTip
              author {
                ...ProfileLink_user
              }
              message
              createdAt
            }
          }
        }
      }

      ... on Post {
        title
        url
      }

      ... on Page {
        title
        url
      }

      ... on LifeNode {
        idInt
        title
        slug
      }
    }
  }
`;

export default query;
