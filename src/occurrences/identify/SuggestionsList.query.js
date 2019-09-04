import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  fragment SuggestionsList_occurrence on Occurrence  {
    id,
    suggestions(first: 100) {
      edges {
        node {
          id
          author {
            avatar(width: 40, height: 40) {
              url
            }
            username
            ...ProfileLink_user
          }
          identity {
            id
            title
            ...PlantLink_plant
          }
          voting {
            ...VotingButtons_voting
          }
        }
      }
    }
  }
`;
export default query
