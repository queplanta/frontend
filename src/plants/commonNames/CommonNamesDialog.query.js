import graphql from "babel-plugin-relay/macro";

const query = graphql`
  fragment CommonNamesDialog__commonNames on LifeNode {
    id
    myPerms

    allCommonNames: commonNames {
      edges {
        node {
          id
          ...CommonNameItem_commonName
        }
      }
    }

    commonNamesStats: commonNames {
      totalCount
    }
  }
`;

export default {
  plant: query,
};
