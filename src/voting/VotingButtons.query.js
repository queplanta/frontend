import graphql from 'react-relay';

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
export default {voting: query}

