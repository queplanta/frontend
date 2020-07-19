import React from "react";
import { Helmet } from "react-helmet";
import { Paper, withStyles } from "@material-ui/core";
import PageTitle from "../lib/PageTitle.js";
import { Width } from "../ui";
import PostList from "./PostList.js";
import { ToolbarHeaderContext } from "../ToolbarHeaderContext.js";

function Home(props) {
  const { viewer } = props;

  return (
    <Width>
      <ToolbarHeaderContext.Consumer>
        {(context) => <b>CONTEXT</b>}
      </ToolbarHeaderContext.Consumer>
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
