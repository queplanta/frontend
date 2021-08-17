import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query OccurrenceAddQuery {
    viewer {
      id
    }
    occurranceTypes: __type(name: "OccurranceType") {
      enumValues {
        name
        description
      }
    }
    trunkTypes: __type(name: "TrunkType") {
      enumValues {
        name
        description
      }
    }
    canopyPositions: __type(name: "CanopyPosition") {
      enumValues {
        name
        description
      }
    }
    healthStates: __type(name: "HealthState") {
      enumValues {
        name
        description
      }
    }
  }
`;
export default query;
