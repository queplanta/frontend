import React from 'react'
import ReactJsxParser from 'react-jsx-parser'
import { Typography, Grid, Paper } from '@material-ui/core';
import Link from './Link.js'
import Image from './JsxParser/Image.js'

export default (props) => {
  const {environment, ...otherProps} = props;
  return <ReactJsxParser
    bindings={{
      environment,
    }}
    components={{
      Link,
      Image: (imgProps) => <Image environment={environment} {...imgProps} />,
      Typography, 
      Grid,
      Paper,
    }}
    {...otherProps}
  />
}
