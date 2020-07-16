import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Paper,
  MobileStepper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Toolbar,
  useTheme,
  isWidthDown,
  withStyles,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { useRouter } from "found";
import { useSnackbar } from "notistack";
import { hasFormErrors } from "../lib/FormErrors.js";
import { useFormInput } from "../lib/forms.js";
import OccurrenceAddMutation from "./OccurrenceAdd.mutation.js";
import AddIdentifyMutation from "./identify/AddIdentify.mutation.js";
import { Width } from "../ui";
import withWidth from "../lib/withWidth.js";
import PageTitle from "../lib/PageTitle.js";
import { defaultPosition } from "./Map.js";
import { useLoginRequired } from "../accounts/LoginRequired.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";

import StepOne from "./OccurrenceAdd.1.js";
import StepTwo from "./OccurrenceAdd.2.js";
import StepThree from "./OccurrenceAdd.3.js";
import StepFour from "./OccurrenceAdd.4.js";

function OccurrenceAdd({
  classes,
  environment,
  setFormErrors,
  viewer,
  width: currentWidth,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated } = useLoginRequired();
  const [lifeNode, setLifeNode] = useState(null);
  const { router } = useRouter();
  const theme = useTheme();
  const when = useFormInput("");
  const notes = useFormInput("");
  const [images, setImages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(defaultPosition);
  const [activeStep, setActiveStep] = React.useState(0);
  const [occurrenceType, setOccurrenceType] = useState(null);
  const steps = getSteps();
  const maxSteps = steps.length;
  const fullScreen = isWidthDown("sm", currentWidth);

  useEffect(
    () =>
      router.addNavigationListener(() =>
        images.length > 0
          ? "Você começou a preencher o formulário. Tem certeza que deseja descartar as alterações?"
          : true
      ),
    []
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBackHistory = () => {
    window.history.length ? window.history.go(-1) : router.push("/");
  };

  function onSuccess(response) {
    setIsSaving(false);

    if (lifeNode) {
      enqueueSnackbar("Observação adicionada com sucesso", {
        variant: "success",
      });
      router.push(
        `/observacoes/${response.occurrenceCreate.occurrence.node.id}`
      );
    } else {
      enqueueSnackbar("Requisição de identificação adicionada com sucesso", {
        variant: "success",
      });
      router.push(
        `/observacoes/${response.whatIsThisCreate.occurrence.node.id}`
      );
    }
  }

  const mutationConfig = {
    setFormErrors,
    onSuccess,
    onError: () => {
      enqueueSnackbar("Ocorreu um erro", { variant: "error" });
      setIsSaving(false);
    },
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (isAuthenticated()) {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image.file);
      });
      setIsSaving(true);

      if (lifeNode) {
        OccurrenceAddMutation.commit(
          environment,
          {
            location: markerPosition
              ? {
                  type: "Point",
                  coordinates: markerPosition,
                }
              : null,
            lifeId: lifeNode.id,
            when: when.value,
            notes: notes.value,
          },
          formData,
          mutationConfig
        );
      } else {
        AddIdentifyMutation.commit(
          environment,
          {
            location: markerPosition
              ? {
                  type: "Point",
                  coordinates: markerPosition,
                }
              : null,
            when: when.value,
            notes: notes.value,
          },
          formData,
          mutationConfig
        );
      }
    }
  }

  function getSteps() {
    return [
      "Adicionar Fotos",
      "Localização",
      "Que planta é essa?",
      "Mais detalhes",
    ];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <StepOne
            images={images}
            setImages={setImages}
            setMarkerPosition={setMarkerPosition}
            fullScreen={fullScreen}
          />
        );
      case 1:
        return (
          <StepTwo
            images={images}
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
          />
        );
      case 2:
        return (
          <StepThree
            images={images}
            lifeNode={lifeNode}
            setLifeNode={setLifeNode}
            environment={environment}
            occurrenceType={occurrenceType}
            setOccurrenceType={setOccurrenceType}
          />
        );
      case 3:
        return <StepFour when={when} notes={notes} isSaving={isSaving} />;
      default:
        return "Unknown step";
    }
  }

  function getStepsNextValidation(step) {
    switch (step) {
      case 0:
        return false;
      case 1:
        return false;
      case 2:
        return (
          occurrenceType === null ||
          (occurrenceType === "occurrence" && lifeNode === null)
        );
      case 3:
        return false;
      default:
        return true;
    }
  }

  const continueButton = (
    <Button
      variant="contained"
      color="primary"
      onClick={handleNext}
      disabled={getStepsNextValidation(activeStep)}
    >
      Continuar
    </Button>
  );

  const saveButton = (
    <ButtonWithProgress
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      disabled={getStepsNextValidation(activeStep)}
      isLoading={isSaving}
    >
      Salvar
    </ButtonWithProgress>
  );

  const continueMobileButton = (
    <Button
      size="small"
      onClick={handleNext}
      disabled={getStepsNextValidation(activeStep)}
    >
      Continuar
      {theme.direction === "rtl" ? (
        <KeyboardArrowLeft />
      ) : (
        <KeyboardArrowRight />
      )}
    </Button>
  );

  const saveMobileButton = (
    <ButtonWithProgress
      size="small"
      onClick={handleSubmit}
      disabled={getStepsNextValidation(activeStep)}
      isLoading={isSaving}
    >
      Salvar
    </ButtonWithProgress>
  );

  var stepContent = (
    <Stepper
      className={classes.paper}
      activeStep={activeStep}
      orientation="vertical"
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
            {getStepContent(index)}
            <div className={classes.actionsContainer}>
              <div className={classes.wrapButton}>
                {activeStep !== 0 && (
                  <Button
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Voltar
                  </Button>
                )}
                {activeStep === steps.length - 1 ? saveButton : continueButton}
              </div>
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );

  if (fullScreen) {
    stepContent = (
      <Dialog open={true} fullScreen={true}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleBackHistory}
              aria-label="Voltar"
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Adicionar localização de espécie
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.dialogContent}>
          {getStepContent(activeStep)}
        </div>
        <MobileStepper
          steps={maxSteps}
          position="bottom"
          variant="text"
          activeStep={activeStep}
          nextButton={
            activeStep === steps.length - 1
              ? saveMobileButton
              : continueMobileButton
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Voltar
            </Button>
          }
        />
      </Dialog>
    );
  }

  return (
    <Width component="div">
      <Helmet title="Adicionar localização de uma espécie ou pedido de identificação por foto" />
      <PageTitle>
        Adicionar localização de espécie ou pedir identificação por foto
      </PageTitle>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>{stepContent}</form>
      </Paper>
    </Width>
  );
}

const styles = (theme) => ({
  paper: {
    marginBottom: theme.spacing(8),
  },
  button: {
    marginRight: theme.spacing(3),
  },
  dialogContent: {
    paddingTop: theme.spacing(7),
  },
  wrapButton: {
    margin: theme.spacing(3, 0, 0, 0),
    textAlign: "text-right",
  },
});

export default withStyles(styles)(hasFormErrors(withWidth()(OccurrenceAdd)));
