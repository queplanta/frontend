import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query RevisionItemQuery($revisionID: ID!) {
    revision(id: $revisionID) {
      id
      idInt
      type
      typeDisplay
      isTip
      author {
        ...ProfileLink_user
      }
      createdAt
      after(first: 50) {
        edges {
          node {
            id
            idInt
            createdAt
            author {
              ...ProfileLink_user
            }
          }
        }
      }
      before {
        id
        idInt
        createdAt
        author {
          ...ProfileLink_user
        }
      }
      object {
        id
        __typename

        ... on DocumentNode {
          revisionCreated {
            author {
              username
              avatar(width: 60, height: 60) {
                url
              }
            },
            createdAt
          }
        }
        
        ... on Vote {
          value
        }
        
        ... on Comment {
          body
        }
        ... on Post {
          title,
          body,
          publishedAt,
          tags(first: 50) {
            edges {
              node {
                slug,
                title,
              }
            }
          }
        }

        ... on Page {
          title,
          body,
          publishedAt
        }
      }
    }
  }
`;
export default query
