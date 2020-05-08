import React from 'react'
import ReactJsxParser from 'react-jsx-parser'
import { Typography, Grid, Paper, withStyles } from '@material-ui/core';
import Link from './Link.js'
import Image from './JsxParser/Image.js'

const JsxParser = (props) => {
  const {environment, classes, ...otherProps} = props;
  return <div className={classes.root}><ReactJsxParser
    bindings={{
      environment,
    }}
    showWarnings={true}
    renderInWrapper={false}
    components={{
      Link,
      Image: (imgProps) => <Image environment={environment} {...imgProps} />,
      Typography, 
      Grid,
      Paper,
    }}
    {...otherProps}
  /></div>
}

export default withStyles((theme) => ({
  root: {
    "& ol, & ul": {
      listStylePosition: 'inside',
    }
  }
}))(JsxParser)
