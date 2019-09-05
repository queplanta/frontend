import graphql from 'babel-plugin-relay/macro';

const query = graphql `
  fragment CommentsItem_comment on Comment {
    id
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
  }
`;
export default query