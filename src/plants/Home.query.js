import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query HomePlantQuery {
    viewer {
      id
    }
    ranks: __type(name: "Rank") {
      enumValues {
        name
        description
      }
    }
    edibilities: __type(name: "Edibility") {
      enumValues {
        name
        description
      }
    }
  }
`;

export default query;
