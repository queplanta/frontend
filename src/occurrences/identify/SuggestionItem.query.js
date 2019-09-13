import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  fragment SuggestionItem_suggestionID on SuggestionID {
    id
    myPerms
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
`;
export default query
