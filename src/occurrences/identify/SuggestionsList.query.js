import graphql from 'react-relay';

const query = graphql`
  fragment SuggestionsList_occurrence on Occurrence  {
    id,
    myPerms,
    identity {
      id
      ...PlantLink_plant
    }
    suggestions(first: 100) @connection(key: "Occurrence_suggestions") {
      edges {
        node {
          id
          ...SuggestionItem_suggestionID
        }
      }
    }
  }
`;
export default {occurrence: query}
