import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query HomeDirectoryQuery {
    viewer {
      id
    }
  }
`;

export default query;
