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
    flowerTypes: __type(name: "FlowerType") {
      enumValues {
        name
        description
      }
    }
    flowerColors: __type(name: "FlowerColor") {
      enumValues {
        name
        description
      }
    }
    growthHabits: __type(name: "GrowthHabit") {
      enumValues {
        name
        description
      }
    }
    growthRates: __type(name: "GrowthRate") {
      enumValues {
        name
        description
      }
    }
    successions: __type(name: "Succession") {
      enumValues {
        name
        description
      }
    }
    threateneds: __type(name: "Threatened") {
      enumValues {
        name
        description
      }
    }
  }
`;
export default query;
