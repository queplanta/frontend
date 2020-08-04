import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";
import { Grid, TextField, withStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useRouter } from "found";
import { hasFormErrors, FormErrors } from "../lib/FormErrors.js";
import PageCreateMutation from "./PageCreate.mutation.js";
import { useFormInput } from "../lib/forms.js";
import PageTitle from "../lib/PageTitle.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import JsxPreviewField from "../lib/JsxPreviewField.js";
import SingleHeader from "../lib/SingleHeader.js";
import { ToolbarHeaderContext } from "../ToolbarHeaderContext.js";

function PageCreate({ classes, environment, setFormErrors }) {
  const { enqueueSnackbar } = useSnackbar();
  const { router } = useRouter();

  const url = useFormInput("");
  const title = useFormInput("");
  const publishedAt = useFormInput(moment().format("YYYY-MM-DDTHH:mm:ss"));
  const body = useFormInput("");

  const [isSaving, setIsSaving] = useState(false);

  const toolbarContext = useContext(ToolbarHeaderContext);
  useEffect(() => {
    toolbarContext.setToolbarHeader(
      <SingleHeader>Escrever nova página</SingleHeader>
    );
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    PageCreateMutation.commit(
      environment,
      {
        url: url.value,
        title: title.value,
        publishedAt: publishedAt.value,
        body: body.value,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar("Criada com sucesso", { variant: "success" });
          setIsSaving(false);
          router.push(`/${url.value}`);
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
      <Helmet title="Escrever nova Página" />
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit}
        className={classes.pageRoot}
      >
        <Grid item xs={12}>
          <PageTitle>Escrever nova Página</PageTitle>
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
}))(hasFormErrors(PageCreate));
