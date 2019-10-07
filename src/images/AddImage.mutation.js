import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from '../relay';

const mutation = graphql`
  mutation AddImageMutation($input: ImageCreateInput!) {
    imageCreate(input: $input) {
      image {
        node {
          id
          smallImage: image(width: 200, height: 200) {
            url
          }
          ...ImageThumbnail_image
        }
      }
      errors {
        code,
        location
        message
      }
    }
  }
`;


function commit(environment, input, uploadables, callbacks) {
  const {imagingId, ...otherInputs} = input;
  return commitMutation({
    mutationName: 'imageCreate',
    environment,
    mutation,
    input: otherInputs,
    uploadables,
    callbacks,
    config: {
      configs: [{
        type: 'RANGE_ADD',
        parentID: imagingId,
        connectionInfo: [{
          key: 'List_images',
          rangeBehavior: 'append'
        }],
        edgeName: 'image',
      }]
    }
  });
}

export default { commit };
