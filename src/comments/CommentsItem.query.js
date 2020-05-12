import graphql from "babel-plugin-relay/macro";

export const query = graphql`
  fragment CommentsItem_comment on Comment
    @argumentDefinitions(
      isRepliesExpanded: { type: "Boolean!", defaultValue: false }
    ) {
    id
    myPerms
    body
    document {
      revisionsCount
    }
    revisionCreated {
      createdAt
      author {
        id
        username
        avatar(width: 40, height: 40) {
          url
        }
        ...ProfileLink_user
      }
    }
    voting {
      ...VotingButtons_voting
    }
    commenting {
      id
      count
      ...CommentsList_commenting @include(if: $isRepliesExpanded)
    }
  }
`;

export const fragmentSpec = {
  comment: query,
};

export const refetchQuery = graphql`
  query CommentsItemQuery($id: ID!, $isRepliesExpanded: Boolean!) {
    comment(id: $id) {
      id
      ...CommentsItem_comment @arguments(isRepliesExpanded: $isRepliesExpanded)
    }
  }
`;
