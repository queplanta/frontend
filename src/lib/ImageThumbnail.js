import React, { useState } from 'react';
import { CircularProgress, Button, Dialog, DialogContent, DialogActions, useMediaQuery, withStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { createRefetchContainer } from 'react-relay';
import { fragmentSpec, refetchQuery } from './ImageThumbnail.query.js';

function ImageThumbnail(props) {
  const {relay, classes, image, className, width, height, ...imgProps} = props;
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function onClick() {
    setOpen(true)
    setLoading(true)
    relay.refetch(fragmentVariables => ({
        id: image.id,
        isOpen: true
      }), null, (error) => {
        if (error) {
          console.error(error)
        }
        setLoading(false)
      }
    )
  }

  function handleClose() {
    setOpen(false)
  }

  return <React.Fragment>
    <img
      alt=""
      onClick={onClick}
      className={clsx(classes.img, className)}
      width={width}
      height={height}
      {...imgProps}
    />
    <Dialog
      keepMounted={false}
      open={isOpen}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="xl"
      scroll="body"
    >
      <DialogContent className={classes.dialogContent}>
        {isLoading && <CircularProgress />}
        {(!isLoading && image.bigImage) && <img
          alt=""
          {...imgProps}
          src={image.bigImage.url}
        />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>;
}

const styles = (theme) => ({
  img: {
    cursor: 'pointer',
  },
  dialogContent: {
    paddingTop: theme.spacing(3),
  }
})
export default createRefetchContainer(
  withStyles(styles)(ImageThumbnail),
  fragmentSpec,
  refetchQuery
);
