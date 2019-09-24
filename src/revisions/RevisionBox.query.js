import graphql from 'react-relay'

const query = graphql`
  fragment RevisionBox_document on Document {
    id
    revisionsCount
    revisionTip {
      createdAt
      author {
        username
        ...ProfileLink_user
      }
    }
    revisionCreated {
      createdAt
      author {
        username
        ...ProfileLink_user
      }
    }
  }
`;
export default {document: query}