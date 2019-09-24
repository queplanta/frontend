import graphql from 'react-relay';

const query = graphql`
  fragment UserActivityListItem_revision on Revision {
    id
    type
    typeDisplay
    createdAt
    object {
      id
      __typename
      
      ... on Vote {
        value
      }
      
      ... on Comment {
        body
      }
    }
  }
`;
export default {revision: query}