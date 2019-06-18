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
          bigImage: image(width: 400, height: 300) {
            url
          }
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
