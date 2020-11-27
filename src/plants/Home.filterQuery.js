import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query HomePlantsFilterQuery(
    $search: String
    $edibles: Boolean
    $edibility: [Edibility]
    $rank: [Rank]
    $flowerColors: [String]
    $leafType: [String]
    $phyllotaxy: [String]
    $flowerTypes: [String]
    $fruitType: [String]
    $growthHabit: [String]
    $threatened: [String]
  ) {
    viewer {
      id
      ...PlantList_viewer
        @arguments(
          edibles: $edibles
          search: $search
          edibility: $edibility
          rank: $rank
          flowerColors: $flowerColors
          leafType: $leafType
          phyllotaxy: $phyllotaxy
          flowerTypes: $flowerTypes
          fruitType: $fruitType
          growthHabit: $growthHabit
          threatened: $threatened
        )
    }
  }
`;

export default query;
