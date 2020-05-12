import graphql from "babel-plugin-relay/macro";

const query = graphql`
  fragment CollectionItemToggle_plant on LifeNode {
    id
    title
    myCollectionItem {
      id
    }
  }
`;
export default { plant: query };
