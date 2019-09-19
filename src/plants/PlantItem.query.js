import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  fragment PlantItem_lifeNode on LifeNode {
    id
    idInt
    title
    slug
    rankDisplay
    images(first: 1) {
      edges {
        node {
          id
          bigImage: image(width: 440, height: 520) {
            url
          }
        }
      }
    }
    commonNames(first: 20) {
      edges {
        node {
          id
          name
          language
        }
      }
    }
  }
`;
export default {lifeNode: query}
