import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export default (props) => {
  const { language, children, ...otherProps } = props;

  return (
    <SyntaxHighlighter
      language="jsx"
      showLineNumbers={true}
      style={prism}
      wrapLines={false}
      {...otherProps}
    >
      {children}
    </SyntaxHighlighter>
  );
};
