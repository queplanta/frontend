import React from 'react'
import ReactJsxParser from 'react-jsx-parser'
import Link from './Link.js'

export default (props) => (
  <ReactJsxParser
    // bindings={{
    //   foo: 'bar',
    //   myEventHandler: () => { /* ... do stuff ... */ },
    // }}
    components={{ Link }}
    {...props}
  />
)