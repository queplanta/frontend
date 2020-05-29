import graphql from "babel-plugin-relay/macro";

export const fragmentQuery = graphql`
  fragment RevisionList_viewer on Node
    @argumentDefinitions(pageSize: { type: "Int", defaultValue: 30 }) {
    id
    __typename

    ... on DocumentNode {
      idInt
      revisions(first: $pageSize) {
        edges {
          node {
            id
            idInt
            index
            type
            typeDisplay
            isTip
            author {
              ...ProfileLink_user
            }
            message
            createdAt
          }
        }
      }
    }

    ... on Post {
      title
    }

    ... on Page {
      title
    }

    ... on LifeNode {
      title
    }
  }
`;

export const fragmentSpec = {
  viewer: fragmentQuery,
};

export const query = graphql`
  query RevisionListQuery($pageSize: Int!) {
    viewer {
      ...RevisionList_viewer @arguments(pageSize: $pageSize)
    }
  }
`;

export default query;
