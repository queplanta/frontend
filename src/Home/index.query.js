import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query HomeQuery {
    viewer {
      ...RecentPosts_viewer @arguments(count: 3)
      ...PeopleWhoPlant_viewer @arguments(count: 5)
      ...PopularPlants_viewer @arguments(count: 5)
      ...MostDesiredPlants_viewer @arguments(count: 5)
    }
  }
`;
export default query;
