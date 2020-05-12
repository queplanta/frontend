import graphql from "babel-plugin-relay/macro";

const query = graphql`
  fragment WishItemToggle_plant on LifeNode {
    id
    title
    myWishItem {
      id
    }
  }
`;
export default { plant: query };
