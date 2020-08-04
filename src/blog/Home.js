import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Paper, withStyles } from "@material-ui/core";
import PageTitle from "../lib/PageTitle.js";
import { Width } from "../ui";
import PostList from "./PostList.js";
import SingleHeader from "../lib/SingleHeader.js";
import { ToolbarHeaderContext } from "../ToolbarHeaderContext.js";

function Home(props) {
  const { viewer } = props;

  const toolbarContext = useContext(ToolbarHeaderContext);
  useEffect(() => {
    toolbarContext.setToolbarHeader(<SingleHeader>Blog</SingleHeader>);
  }, []);

  return (
    <Width>
      <Helmet title="Blog" />
      <PageTitle>Blog</PageTitle>
      <Paper>
        <PostList viewer={viewer} title="Blog" count={30} />
      </Paper>
    </Width>
  );
}

const styles = {};

export default withStyles(styles)(Home);
