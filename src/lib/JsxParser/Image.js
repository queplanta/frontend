import React from 'react';
import { QueryRenderer } from 'react-relay';
import { CircularProgress, Typography, Card, CardContent, withStyles } from '@material-ui/core';
import ImageThumbnail from '../../lib/ImageThumbnail.js';
import { query } from './Image.query.js';

const Image = ({classes, environment, id, width, height}) => {
  return <Card className={classes.root}>
    <CardContent className={classes.content}>
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
    </CardContent>
  </Card>
}

export default withStyles((theme) => ({
  root: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
  content: {
    lineHeight: '0px',
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
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
    lineHeight: 1.5,
  },
}))(Image)
