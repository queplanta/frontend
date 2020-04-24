import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query UsageCreateQuery {
    usageTypes: __type(name: "UsageType") {
      enumValues {
        name
        description
      }
    }
  }
`;

export default query
