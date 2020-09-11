import React from "react";
import { Helmet } from "react-helmet";
import { Paper, withStyles } from "@material-ui/core";
import PageTitle from "../lib/PageTitle.js";
import { Width } from "../ui";
import PostList from "./PostList.js";
import BreadcrumbsWithHome from "../lib/BreadcrumbsWithHome.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function Home(props) {
  const { viewer } = props;

  return (
    <Width>
      <Helmet title="Blog" />
      <BreadcrumbsWithHome>
        <BreadcrumbsItem to="/blog">Blog</BreadcrumbsItem>
      </BreadcrumbsWithHome>
      <PageTitle>Blog</PageTitle>
      <Paper>
        <PostList viewer={viewer} title="Blog" count={30} />
      </Paper>
    </Width>
  );
}

const styles = {};

export default withStyles(styles)(Home);
