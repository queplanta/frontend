import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query PostCreateQuery {
    viewer {
      id
    }
  }
`;
export default query;
