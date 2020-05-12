import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query IdentifyPageQuery {
    viewer {
      id
    }
  }
`;
export default query;
