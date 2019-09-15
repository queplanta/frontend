import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  fragment WhatIsThis_occurrence on Occurrence  {
    id,
    where,
    when,
    myPerms,
    identity {
      id
      ...PlantLink_plant
    }
    images(first: 20) {
      edges {
        node {
          id
          smallImage: image(width: 400, height: 300) {
            url
          }
          ...ImageThumbnail_image
        }
      }
    }
    revisionCreated {
      createdAt
      author {
        avatar(width: 40, height: 40) {
          url
        }
        username
        ...ProfileLink_user
      }
    }
    ...SuggestionsList_occurrence
  }
`;
export default query
