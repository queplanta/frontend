import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query HomeQuery {
    viewer {
      ...PopularPlants_viewer @arguments(count: 5)
      ...MostDesiredPlants_viewer @arguments(count: 5)
      ...PeopleWhoPlant_viewer @arguments(count: 5)
      ...RecentPosts_viewer @arguments(count: 3)
    }
  }
`;
export default query;
