import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query HomeIdentifyQuery {
    viewer {
      id
    }
  }
`;
export default query;
