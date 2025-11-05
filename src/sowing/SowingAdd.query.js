import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query SowingAddQuery {
    viewer {
      id
    }
  }
`;
export default query;
