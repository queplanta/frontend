import graphql from 'react-relay';

const query = graphql`
  fragment PostItem_post on Post {
    id,
    url,
    title,
    publishedAt,
    commenting {
      count
    }
    voting {
      countUps
      countDowns
    }
    tags(first: 50) {
      edges {
        node {
          title
          slug
        }
      }
    }
    revisionCreated {
      author {
        ...ProfileLink_user
      }
    }
  }
`;
export default {post: query}
