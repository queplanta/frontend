import React from "react";
import { QueryRenderer } from "react-relay";
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  withStyles,
} from "@material-ui/core";
import clsx from "clsx";
import ImageThumbnail from "../../lib/ImageThumbnail.js";
import { query } from "./Image.query.js";

const Image = ({
  classes,
  environment,
  id,
  width,
  height,
  noCard,
  noDescription,
  responsive,
  float,
  ...props
}) => {
  const content = (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{
        id: id,
        width,
        height,
      }}
      render={({ error, props }) => {
        const style = { width: `${width}px`, height: `${height}px` };
        if (error) {
          console.error(error);
          return (
            <span className={classes.fakeImg} style={style}>
              <strong>Erro!</strong>
            </span>
          );
        }

        if (props && props.image) {
          return (
            <React.Fragment>
              {props.image && (
                <ImageThumbnail
                  alt={props.image.description}
                  image={props.image}
                  src={props.image.smallImage.url}
                  width={width}
                  height={height}
                  className={clsx(classes.img, {
                    [classes.imgLeft]: float === "left" && noCard,
                    [classes.imgRight]: float === "right" && noCard,
                    [classes.imgResponsive]: responsive,
                  })}
                  {...props}
                />
              )}
              {!noDescription && props.image.description && (
                <Typography
                  component="p"
                  className={classes.description}
                  style={{ maxWidth: `${width}px` }}
                >
                  {props.image.description}
                </Typography>
              )}
            </React.Fragment>
          );
        }

        return (
          <span
            className={clsx(classes.fakeImg, {
              [classes.imgLeft]: float === "left",
              [classes.imgRight]: float === "right",
            })}
            style={style}
          >
            <CircularProgress />
          </span>
        );
      }}
    />
  );

  if (noCard) {
    return content;
  }

  return (
    <Card
      className={clsx(classes.root, {
        [classes.cardLeft]: float === "left",
        [classes.cardRight]: float === "right",
      })}
    >
      <CardContent className={classes.content}>{content}</CardContent>
    </Card>
  );
};

export default withStyles((theme) => ({
  root: {
    display: "inline-block",
    verticalAlign: "top",
  },
  cardLeft: {
    float: "left",
    margin: theme.spacing(3, 3, 3, 0),
  },
  cardRight: {
    float: "right",
    margin: theme.spacing(3, 0, 3, 3),
  },
  content: {
    lineHeight: "0px",
    "&:last-child": {
      paddingBottom: theme.spacing(2),
    },
  },
  img: {
    maxWidth: "100%",
    objectFit: "scale-down",
  },
  imgResponsive: {
    width: "100%",
    objectFit: "cover",
  },
  imgLeft: {
    float: "left",
    margin: theme.spacing(3, 3, 3, 0),
  },
  imgRight: {
    float: "right",
    margin: theme.spacing(3, 0, 3, 3),
  },
  fakeImg: {
    display: "inline-block",
    maxWidth: "100%",
  },
  description: {
    whiteSpace: "pre-wrap",
    marginTop: theme.spacing(1),
    maxWidth: "100%",
    lineHeight: 1.5,
  },
}))(Image);
