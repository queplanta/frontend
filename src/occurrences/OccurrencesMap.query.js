import graphql from 'babel-plugin-relay/macro';

export const fragmentQuery = graphql`
  fragment OccurrencesMapConnection_viewer on Query
  @argumentDefinitions(
    identity: {type: "ID"}
    bbox: {type: "String"}
  )
  {
    allOccurrences(first: 10000, isIdentityNull: false, withinBbox: $bbox)
    @connection(key: "OccurrencesMap_allOccurrences")
    {
      edges {
        node {
          id
          identity {
            id
            idInt
            title
            commonName {
              name
            }
            ...PlantLink_plant
            rankDisplay
            images(first: 1) {
              edges {
                node {
                  id
                  smallImage: image(width: 440, height: 520) {
                    url
                  }
                }
              }
            }
          }
          location {
            type
            coordinates
          }
          author {
            id
            ...ProfileLink_user
          }
          revisionCreated {
            createdAt
          }
        }
      }
    }
  }
`;

export const fragmentSpec = {
  viewer: fragmentQuery
}

export const refetchQuery = graphql`
  query OccurrencesMapQuery($identity: ID, $bbox: String)
  {
    viewer {
      id
      ...OccurrencesMapConnection_viewer @arguments(bbox: $bbox, identity: $identity)
    }
  }
`;
