import graphql from 'babel-plugin-relay/macro'

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