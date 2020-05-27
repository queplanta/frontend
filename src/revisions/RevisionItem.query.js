import graphql from "babel-plugin-relay/macro";

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
            }
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
          title
          body
          publishedAt
          tags(first: 50) {
            edges {
              node {
                slug
                title
              }
            }
          }
        }

        ... on Page {
          title
          body
          publishedAt
        }

        ... on LifeNode {
          title
          description
          edibility
          edibilityDisplay
          ...RankDisplay_plant
          commonNames(first: 20) {
            edges {
              node {
                id
                name
                language
                voting {
                  ...VotingButtons_voting
                }
              }
            }
          }
          mainImage: images(first: 1) {
            edges {
              node {
                id
                smallImage: image(width: 225, height: 300) {
                  url
                }
                ...ImageThumbnail_image
              }
            }
          }
          images(first: 20) {
            edges {
              node {
                id
                smallImage: image(width: 200, height: 200) {
                  url
                }
                ...ImageThumbnail_image
              }
            }
          }
        }
      }
    }
  }
`;
export default query;
