import graphql from 'react-relay';

export const query = graphql`
  fragment ImageThumbnail_image on Image
  @argumentDefinitions( 
    isOpen: {type:"Boolean!", defaultValue: false}
  )
  {
    id
    bigImage: image(width: 800, height: 600) @include(if: $isOpen) {
      url
    }
    myPerms @include(if: $isOpen)
    revisionCreated @include(if: $isOpen) {
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
    commenting @include(if: $isOpen) {
      id
      count
    }
  }
`;

export const fragmentSpec = {
  image: query
}

export const refetchQuery = graphql`
  query ImageThumbnailQuery($id: ID!, $isOpen: Boolean!) {
    image(id: $id) {
      id
      ...ImageThumbnail_image @arguments(isOpen: $isOpen)
    }
  }
`
