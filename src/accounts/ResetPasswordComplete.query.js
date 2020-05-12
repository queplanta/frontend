import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query ResetPasswordCompleteQuery {
    viewer {
      id
    }
  }
`;
export default query;
