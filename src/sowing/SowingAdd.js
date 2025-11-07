import React, { useState, useMemo, useContext } from "react";
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
  TextField,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { useRouter } from "found";
import { useSnackbar } from "notistack";
import { hasFormErrors, FormErrors } from "../FormErrors.js";
import { useFormInput } from "../lib/forms.js";
import SowingAddMutation from "./SowingAdd.mutation.js";
import { Width } from "../ui";
import withWidth from "../lib/withWidth.js";
import PageTitle from "../lib/PageTitle.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import BreadcrumbsWithHome from "../lib/BreadcrumbsWithHome.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

// Reuse existing steps for photos and location
import OccurrenceStepOne from "../occurrences/OccurrenceAdd.1.js";
import OccurrenceStepTwo from "../occurrences/OccurrenceAdd.2.js";
import { LoginRequiredContext } from "../accounts/LoginRequired.js";
import SpeciesChips from "./SpeciesChips.js";
import { MUVUCA_QUERY_VALUE, muvucaSpeciesList } from "./muvucaSpeciesData.js";

function SowingAdd({
  classes,
  environment,
  setFormErrors,
  width: currentWidth,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    router,
    match: { location },
  } = useRouter();
  const theme = useTheme();

  const [images, setImages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [markerPosition, setMarkerPosition] = useState([-20.074, -43.3986]);
  const [activeStep, setActiveStep] = React.useState(0);
  const notes = useFormInput("");
  const name = useFormInput((location.query && location.query.name) || "");
  const email = useFormInput((location.query && location.query.email) || "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fullScreen = isWidthDown("sm", currentWidth);
  const { currentUser } = useContext(LoginRequiredContext);
  const isLoggedIn = !!(currentUser && currentUser.isAuthenticated);

  function toArray(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string")
      return val.indexOf(",") >= 0 ? val.split(",") : [val];
    return [];
  }

  // When ?muvuca=TXV2dWNhOjE%3D is present we use a fixed list of species (with details).
  // Otherwise expect both speciesName and speciesId (relay global ID) in query params.
  // Supports repeated params or comma-separated values.
  const { speciesList, isMuvuca } = useMemo(() => {
    const q = (location && location.query) || {};
    const muvucaParam = q.muvuca;
    const hasMuvuca =
      (Array.isArray(muvucaParam) &&
        muvucaParam.includes(MUVUCA_QUERY_VALUE)) ||
      muvucaParam === MUVUCA_QUERY_VALUE;

    if (hasMuvuca) {
      return { speciesList: muvucaSpeciesList, isMuvuca: true };
    }

    const ids = toArray(q.speciesId || q.species || []);
    const names = toArray(q.speciesName || []);
    const max = Math.max(ids.length, names.length);
    const items = [];
    for (let i = 0; i < max; i++) {
      const id = ids[i] || null;
      const name = names[i] || ids[i] || null;
      if (id || name) items.push({ id, name });
    }
    return { speciesList: items, isMuvuca: false };
  }, [location]);

  const steps = [
    "Bem-vindo",
    "Adicionar Fotos",
    "Localização",
    "Notas e contato",
    "Obrigado!",
  ];
  const maxSteps = steps.length;

  function handleNext() {
    setActiveStep((prev) => prev + 1);
  }

  function handleBack() {
    setActiveStep((prev) => prev - 1);
  }

  function handleBackHistory() {
    window.history.length ? window.history.go(-1) : router.push("/");
  }

  function onSuccess(response) {
    setIsSaving(false);
    setIsSubmitted(true);
    setActiveStep(steps.length - 1);
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
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image.file);
    });
    setIsSaving(true);

    const input = {
      location: markerPosition
        ? { type: "Point", coordinates: markerPosition }
        : null,
      notes: notes.value,
      where: null,
      species: speciesList.map((s) => s.id).filter(Boolean),
      name: isLoggedIn ? null : name.value,
      email: isLoggedIn ? null : email.value,
    };

    SowingAddMutation.commit(environment, input, formData, mutationConfig);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className={classes.welcomeStep}>
            <Typography variant="h5" gutterBottom>
              Bem-vindo, gente que planta! 🌱
            </Typography>
            <Typography variant="body1" paragraph>
              A <strong>muvuca de sementes</strong> é uma técnica de
              reflorestamento que consiste em:
            </Typography>
            <Typography variant="body1" paragraph>
              • <strong>Misturar sementes</strong> de diferentes espécies
              nativas
              <br />• <strong>Criar diversidade biológica</strong> natural
              <br />• <strong>Imitar o processo</strong> de regeneração da
              floresta
            </Typography>
            <Typography variant="body1" paragraph>
              Onde várias espécies <strong>germinam juntas</strong>, criando um{" "}
              <strong>ecossistema equilibrado</strong> e resiliente que favorece
              a <strong>biodiversidade local</strong>.
            </Typography>
            {speciesList.length > 0 && (
              <div className={classes.speciesList}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>
                    Nesta mucuva podem conter as seguintes espécies:
                  </strong>
                </Typography>
                <SpeciesChips
                  species={speciesList}
                  enableDetails={isMuvuca}
                  chipClassName={classes.chip}
                  containerClassName={classes.chips}
                />
              </div>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <OccurrenceStepOne
              images={images}
              setImages={setImages}
              setMarkerPosition={setMarkerPosition}
              fullScreen={fullScreen}
            />
          </div>
        );
      case 2:
        return (
          <OccurrenceStepTwo
            images={images}
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
          />
        );
      case 3:
        return (
          <div className={classes.stepNotes}>
            <Typography gutterBottom>
              Adicione observações sobre a semeadura (opcional)
            </Typography>
            <FormErrors
              filter={(error) => ["__all__", null].indexOf(error.location) >= 0}
            />
            <textarea
              className={classes.textarea}
              rows="4"
              placeholder="Notas"
              value={notes.value}
              onChange={notes.onChange}
            />
            {!isLoggedIn && (
              <div className={classes.contactFields}>
                <Typography variant="subtitle1" gutterBottom>
                  Seus dados de contato
                </Typography>
                <TextField
                  label="Seu nome"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={name.value}
                  onChange={name.onChange}
                />
                <TextField
                  label="Seu email"
                  type="email"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={email.value}
                  onChange={email.onChange}
                />
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className={classes.thanksStep}>
            <Typography variant="h6" gutterBottom>
              Obrigado por plantar e ajudar o reflorestamento!
            </Typography>
            <Typography>
              Sua semeadura foi registrada com sucesso. Cada ação conta para
              restaurar a biodiversidade. Se possível, acompanhe o crescimento e
              registre novas observações no futuro.
            </Typography>
          </div>
        );
      default:
        return null;
    }
  }

  function getStepsNextValidation(step) {
    switch (step) {
      case 0:
      case 1:
      case 2:
      case 3:
        return false;
      case 4:
        return true;
      default:
        return true;
    }
  }

  const continueButton = (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={handleNext}
      disabled={getStepsNextValidation(activeStep)}
      className={classes.primaryButton}
    >
      Continuar
    </Button>
  );

  const saveButton = (
    <ButtonWithProgress
      variant="contained"
      color="primary"
      size="large"
      onClick={handleSubmit}
      disabled={getStepsNextValidation(activeStep)}
      isLoading={isSaving}
      className={classes.primaryButton}
    >
      Salvar
    </ButtonWithProgress>
  );

  const continueMobileButton = (
    <Button
      size="large"
      variant="contained"
      color="primary"
      onClick={handleNext}
      disabled={getStepsNextValidation(activeStep)}
      className={classes.mobileButton}
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
      size="large"
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      disabled={getStepsNextValidation(activeStep)}
      isLoading={isSaving}
      className={classes.mobileButton}
    >
      Salvar
    </ButtonWithProgress>
  );

  let stepContent = (
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
                {activeStep !== 0 && activeStep !== steps.length - 1 && (
                  <Button
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Voltar
                  </Button>
                )}
                {activeStep === steps.length - 1
                  ? null
                  : activeStep === steps.length - 2
                  ? saveButton
                  : continueButton}
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
              Registrar semeadura
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
              ? null
              : activeStep === steps.length - 2
              ? saveMobileButton
              : continueMobileButton
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0 || activeStep === steps.length - 1}
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
      <Helmet title="Registrar uma semeadura" />
      <BreadcrumbsWithHome>
        <BreadcrumbsItem to="/adicionar/semeadura">
          Registrar semeadura
        </BreadcrumbsItem>
      </BreadcrumbsWithHome>
      <PageTitle>Registrar semeadura</PageTitle>
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
  primaryButton: {
    minWidth: 140,
    height: 48,
    fontSize: "1.1rem",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    "&:hover": {
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
      transform: "translateY(-1px)",
    },
    "&:disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      color: "rgba(0, 0, 0, 0.26)",
    },
  },
  mobileButton: {
    minWidth: 120,
    height: 44,
    fontSize: "1rem",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    },
  },
  dialogContent: {
    paddingTop: theme.spacing(7),
  },
  wrapButton: {
    margin: theme.spacing(3, 0, 0, 0),
    textAlign: "center",
    padding: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    borderRadius: theme.spacing(1),
  },
  welcomeStep: {
    padding: theme.spacing(3),
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  speciesList: {
    marginTop: theme.spacing(3),
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: `${theme.spacing(1)}px`,
  },
  chip: {},
  stepNotes: {
    padding: theme.spacing(2),
  },
  textarea: {
    width: "100%",
    minHeight: 120,
    padding: theme.spacing(1),
    border: "1px solid rgba(0,0,0,0.23)",
    borderRadius: 4,
    fontFamily: "inherit",
    fontSize: "1rem",
  },
  contactFields: {
    marginTop: theme.spacing(2),
  },
  thanksStep: {
    padding: theme.spacing(2),
  },
});

export default withStyles(styles)(hasFormErrors(withWidth()(SowingAdd)));
