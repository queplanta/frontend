import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query PlantAddQuery {
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
    flowertypes: __type(name: "FlowerType") {
      enumValues {
        name
        description
      }
    }
    flowercolors: __type(name: "FlowerColor") {
      enumValues {
        name
        description
      }
    }
    growthhabits: __type(name: "GrowthHabit") {
      enumValues {
        name
        description
      }
    }
  }
`;
export default query;
