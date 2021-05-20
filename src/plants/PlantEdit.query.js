import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query PlantEditQuery($plantID: Int!) {
    plant: lifeNodeByIntID(documentId: $plantID) {
      id
      title
      description
      edibility
      rank
      document {
        id
      }
      flowerTypes
      flowerColors
      growthHabit
      sun
      height
      spread
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
  }
`;
export default query;
