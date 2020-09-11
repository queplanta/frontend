import React, { useState } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";
import { Grid, TextField, withStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useRouter } from "found";
import { hasFormErrors, FormErrors } from "../FormErrors.js";
import PostCreateMutation from "./PostCreate.mutation.js";
import { useFormInput } from "../lib/forms.js";
import PageTitle from "../lib/PageTitle.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import JsxPreviewField from "../lib/JsxPreviewField.js";
import BreadcrumbsWithHome from "../lib/BreadcrumbsWithHome.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function PostCreate({ environment, classes, setFormErrors }) {
  const { enqueueSnackbar } = useSnackbar();
  const { router } = useRouter();

  const url = useFormInput("");
  const title = useFormInput("");
  const publishedAt = useFormInput(moment().format("YYYY-MM-DDTHH:mm:ss"));
  const body = useFormInput("");
  const tags = useFormInput("");

  const [isSaving, setIsSaving] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    PostCreateMutation.commit(
      environment,
      {
        url: url.value,
        title: title.value,
        publishedAt: publishedAt.value,
        body: body.value,
        tags: tags.value,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar("Criado com sucesso", { variant: "success" });
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

  return (
    <React.Fragment>
      <Helmet title="Escrever novo Post" />
      <BreadcrumbsWithHome>
        <BreadcrumbsItem to="/blog">Blog</BreadcrumbsItem>
        <BreadcrumbsItem to="/blog/novo">Escrever novo Post</BreadcrumbsItem>
      </BreadcrumbsWithHome>
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit}
        className={classes.pageRoot}
      >
        <Grid item xs={12}>
          <PageTitle>Escrever novo Post</PageTitle>
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
}))(hasFormErrors(PostCreate));
