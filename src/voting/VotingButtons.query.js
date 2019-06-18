import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  fragment VotingButtons_voting on Voting  {
    id,
    countUps,
    countDowns,
    sumValues,
    mine {
      id,
      value
    }
  }
`;
export default query

