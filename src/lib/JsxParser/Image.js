import React from 'react';
import { QueryRenderer } from 'react-relay';
import { CircularProgress, Typography, withStyles } from '@material-ui/core';
import ImageThumbnail from '../../lib/ImageThumbnail.js';
import { query } from './Image.query.js';

const Image = ({classes, environment, id, width, height}) => {
  return <span className={classes.root}>
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{
        id: id,
        width,
        height
      }}
      render={({error, props}) => {
        const style = {width: `${width}px`, height: `${height}px`};
        if (error) {
          console.error(error)
          return <span className={classes.fakeImg} style={style}>
            <strong>Erro!</strong>
          </span>
        }

        if (props) {
          return <React.Fragment>
            <ImageThumbnail
              alt={props.image.description}
              image={props.image}
              src={props.image.smallImage.url}
              className={classes.img}
            />
            {props.image.description && <Typography component="p" className={classes.description} style={{maxWidth: `${width}px`}}>{props.image.description}</Typography>}
          </React.Fragment>
        }

        return <span className={classes.fakeImg} style={style}><CircularProgress /></span>
      }}
    />
  </span>
}

export default withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    border: '1px solid #ccc',
    display: 'inline-block',
    lineHeight: '0px',
    verticalAlign: 'top',
  },
  img: {
    maxWidth: '100%',
  },
  fakeImg: {
    display: 'inline-block',
    maxWidth: '100%',
  },
  description: {
    whiteSpace: 'pre-wrap',
    marginTop: theme.spacing(1),
    maxWidth: '100%',
  },
}))(Image)
