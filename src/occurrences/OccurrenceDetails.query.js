import graphql from "babel-plugin-relay/macro";

const query = graphql`
  fragment OccurrenceDetails_occurrence on Occurrence {
    id
    notes
    location {
      coordinates
    }
    images(first: 20) {
      edges {
        node {
          id
          smallImage: image(width: 860, height: 645) {
            url
          }
          ...ImageThumbnail_image
        }
      }
    }
    commenting {
      ...CommentsList_commenting
    }
    document {
      ...RevisionBox_document
    }
    myPerms
    identity {
      id
      idInt
      title
      commonName {
        name
      }
      slug
      ...RankDisplay_plant
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
    }
  }
`;
export default { occurrence: query };
