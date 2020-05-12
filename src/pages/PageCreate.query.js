import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query PageCreateQuery {
    viewer {
      id
    }
  }
`;
export default query;
