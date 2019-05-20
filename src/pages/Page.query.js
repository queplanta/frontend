import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query PageQuery($url: String!) {
    page: pageByUrl(url: $url) {
      id,
      url,
      title,
      body,
      publishedAt,
      myPerms,
      document {
        revisionsCount
      },
      revisionCreated {
        author {
          ...ProfileLink_user
        }
      }
    }
  }
`;
export default query
