import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  fragment CommonNameItem_commonName on CommonName {
    id
    name
    language
    voting {
      ...VotingButtons_voting
    }
  }
`;

export default {
  commonName: query
}
