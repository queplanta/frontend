import graphql from "babel-plugin-relay/macro";

const query = graphql`
  fragment PlantLink_plant on LifeNode {
    id
    idInt
    title
    slug
  }
`;
export default { plant: query };
