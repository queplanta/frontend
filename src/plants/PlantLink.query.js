import graphql from 'react-relay';

const query = graphql `
  fragment PlantLink_plant on LifeNode {
    id
    idInt
    title
    slug
  }
`;
export default {plant: query}