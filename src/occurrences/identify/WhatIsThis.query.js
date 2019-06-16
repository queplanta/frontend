import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  fragment WhatIsThis_occurrence on Occurrence  {
    id,
    where,
    when,
    images(first: 20) {
      edges {
        node {
          id,
          bigImage: image(width: 800, height: 600) {
            url
          }
        }
      }
    }
    revisionCreated {
      author {
        avatar(width: 40, height: 40) {
          url
        }
        username
        ...ProfileLink_user
      }
      createdAt
    }
  }
`;
export default query
