import graphql from 'react-relay'

const query = graphql`
  fragment RankDisplay_plant on LifeNode {
    title
    rankDisplay
    parents {
      id
      idInt
      title
      slug
      rankDisplay
      ...PlantLink_plant
    }
  }
`;
export default {plant: query}