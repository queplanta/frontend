import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Grid, withStyles } from "@material-ui/core";
import { RelativeDate, Width } from "../ui";
import PageTitle from "../lib/PageTitle.js";
import ProfileLink from "../accounts/ProfileLink";
import VotingButtons from "../voting/VotingButtons.js";
import CommentsList from "../comments/CommentsList.js";
import { hasPerm } from "../lib/perms.js";
import Link from "../lib/Link.js";
import JsxParser from "../lib/JsxParser.js";
import SingleHeader from "../lib/SingleHeader.js";
import { ToolbarHeaderContext } from "../ToolbarHeaderContext.js";

function Post(props) {
  const { post, environment } = props;

  const toolbarContext = useContext(ToolbarHeaderContext);
  useEffect(() => {
    toolbarContext.setToolbarHeader(<SingleHeader>Blog</SingleHeader>);
  }, []);

  return (
    <Width>
      <Helmet title={post.title} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PageTitle>{post.title}</PageTitle>
        </Grid>
        <Grid item xs={12}>
          Enviada por <ProfileLink user={post.revisionCreated.author} />{" "}
          <RelativeDate date={post.publishedAt} />
          <span>. </span>
          <Link to={`/revisions/${post.id}`}>
            {post.document.revisionsCount} alterações
          </Link>
          {hasPerm(post, "edit") && (
            <React.Fragment>
              <span> . </span>
              <Link to={`/blog/${post.id}/editar`}>editar</Link>
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={12}>
          <JsxParser jsx={post.body} environment={environment} />
        </Grid>
        <Grid item xs={12}>
          <VotingButtons voting={post.voting} parentId={post.id} />
        </Grid>
        <Grid item xs={12}>
          <CommentsList commenting={post.commenting} />
        </Grid>
      </Grid>
    </Width>
  );
}

const styles = {};
export default withStyles(styles)(Post);
