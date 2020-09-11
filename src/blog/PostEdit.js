import React, { useState } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";
import { Grid, TextField, IconButton, withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { useSnackbar } from "notistack";
import { useRouter } from "found";
import _ from "lodash";
import { hasFormErrors, FormErrors } from "../FormErrors.js";
import PostEditMutation from "./PostEdit.mutation.js";
import { useFormInput } from "../lib/forms.js";
import PageTitle from "../lib/PageTitle.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import AddImage from "../images/AddImage.js";
import ImageThumbnail from "../lib/ImageThumbnail.js";
import JsxPreviewField from "../lib/JsxPreviewField.js";
import BreadcrumbsWithHome from "../lib/BreadcrumbsWithHome.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function PostEdit({ classes, environment, setFormErrors, post }) {
  const { enqueueSnackbar } = useSnackbar();
  const { router } = useRouter();

  const url = useFormInput(post.url);
  const title = useFormInput(post.title);
  const publishedAt = useFormInput(
    moment(post.publishedAt).format("YYYY-MM-DDTHH:mm:ss")
  );
  const body = useFormInput(post.body);
  const tags = useFormInput(
    post.tags.edges.map((edge) => edge.node.title).join(", ")
  );

  const [isSaving, setIsSaving] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    PostEditMutation.commit(
      environment,
      {
        id: post.id,
        url: url.value,
        title: title.value,
        publishedAt: publishedAt.value,
        body: body.value,
        tags: tags.value,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar("Editado com sucesso", { variant: "success" });
          setIsSaving(false);
          router.push(`/blog/${url.value}`);
        },
        onError: () => {
          enqueueSnackbar("Ocorreu um erro", { variant: "error" });
          setIsSaving(false);
        },
      }
    );
  }

  function onAddImageSuccess(response) {
    const imageId = _.get(response, "imageCreate.image.node.id");
    appendImage(imageId);
  }

  function appendImage(imageId) {
    if (imageId) {
      body.onChange({
        target: {
          value: `${body.value}\n<Image id="${imageId}" width="200" height="200" />`,
        },
      });
    }
  }

  return (
    <React.Fragment>
      <Helmet title={`Editando Post: ${post.title}`} />
      <BreadcrumbsWithHome>
        <BreadcrumbsItem to="/blog">Blog</BreadcrumbsItem>
        <BreadcrumbsItem
          to={`/blog/${post.id}/editar`}
        >{`Editando Post: ${post.title}`}</BreadcrumbsItem>
      </BreadcrumbsWithHome>
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit}
        className={classes.pageRoot}
      >
        <Grid item xs={12}>
          <PageTitle>{`Editando Post: ${post.title}`}</PageTitle>
          <FormErrors
            filter={(error) => ["__all__", null].indexOf(error.location) >= 0}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="URL" fullWidth required {...url} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Title" fullWidth required {...title} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Published At" fullWidth required {...publishedAt} />
        </Grid>
        <Grid item xs={12}>
          <JsxPreviewField
            environment={environment}
            label="Body"
            fullWidth
            multiline
            required
            {...body}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Tags" fullWidth {...tags} />
        </Grid>
        <Grid item xs={12}>
          {post.imaging.images.edges.map(({ node }) => {
            return (
              <span key={node.id} className={classes.imageThumb}>
                <ImageThumbnail
                  alt={node.description}
                  image={node}
                  src={node.smallImage.url}
                />
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  className={classes.imgDeleteButton}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  className={classes.imgAddButton}
                  onClick={() => appendImage(node.id)}
                >
                  <AddPhotoAlternateIcon />
                </IconButton>
              </span>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <AddImage
            parentId={post.id}
            imaging={post.imaging}
            environment={environment}
            onSuccess={onAddImageSuccess}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonWithProgress
            type="submit"
            variant="contained"
            color="primary"
            isLoading={isSaving}
          >
            Salvar
          </ButtonWithProgress>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withStyles((theme) => ({
  pageRoot: {
    padding: theme.spacing(2),
  },
  imageThumb: {
    margin: theme.spacing(0, 1, 1, 0),
    display: "inline-block",
    position: "relative",
    height: 100,
    "& img": {
      border: "1px solid #ccc",
      borderRadius: "4px",
      objectFit: "cover",
      height: 100,
    },
  },
  imgDeleteButton: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  imgAddButton: {
    position: "absolute",
    top: -10,
    left: -10,
  },
}))(hasFormErrors(PostEdit));
