import graphql from 'react-relay';

const query = graphql`
  fragment SuggestionItem_suggestionID on SuggestionID {
    id
    myPerms
    notes
    author {
      avatar(width: 40, height: 40) {
        url
      }
      username
      ...ProfileLink_user
    }
    identity {
      id
      ...PlantLink_plant
    }
    voting {
      ...VotingButtons_voting
    }
    revisionCreated {
      createdAt
    }
  }
`;
export default {suggestionID: query}
