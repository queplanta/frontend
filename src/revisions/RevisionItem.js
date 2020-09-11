import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Card,
  Chip,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DoneIcon from "@material-ui/icons/Done";
import HistoryIcon from "@material-ui/icons/History";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { useRouter } from "found";
import { Link as RouterLink } from "found";
import { RelativeDate, Width } from "../ui";
import PageTitle from "../lib/PageTitle.js";
import JsxParser from "../lib/JsxParser.js";
import ImageThumbnail from "../lib/ImageThumbnail.js";
import ImgDefault from "../plants/PlantImgDefault.js";
import EdibilityBadge from "../plants/EdibilityBadge.js";
import RankDisplay from "../plants/RankDisplay.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import ProfileLink from "../accounts/ProfileLink.js";
import { useLoginRequired } from "../accounts/LoginRequired.js";
import RevisionRevertMutation from "./RevisionRevert.mutation.js";
import BreadcrumbsWithHome from "../lib/BreadcrumbsWithHome.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function RevisionItem(props) {
  const { environment, classes, revision } = props;
  const object = revision.object;
  const { isAuthenticated } = useLoginRequired();
  const { enqueueSnackbar } = useSnackbar();
  const [isSaving, setIsSaving] = useState(false);
  const { router } = useRouter();

  function handleRevisionRevert(e) {
    e.preventDefault();
    setIsSaving(true);
    if (isAuthenticated()) {
      RevisionRevertMutation.commit(
        environment,
        {
          id: revision.id,
        },
        {
          onSuccess: () => {
            enqueueSnackbar("Revisão revertida com sucesso", {
              variant: "success",
            });
            setIsSaving(false);
            router.push(`/revisions/revision/${revision.id}`);
          },
          onError: () => {
            enqueueSnackbar("Ocorreu um erro", { variant: "error" });
            setIsSaving(false);
          },
        }
      );
    }
  }

  let revision_body = "";
  let before, after;
  const revision_pretty_text = [];
  revision_pretty_text["LifeNode"] = "Planta";
  revision_pretty_text["CommonName"] = "Nome em comum";
  revision_pretty_text["Tag"] = "Tag";
  revision_pretty_text["Post"] = "Postagem";
  revision_pretty_text["Comment"] = "Comentário";
  revision_pretty_text["Vote"] = "Voto";
  revision_pretty_text["User"] = "Usuário";
  revision_pretty_text["Image"] = "Foto";
  revision_pretty_text["Occurrence"] = "Ocorrência";
  revision_pretty_text["Page"] = "Página";
  revision_pretty_text["Suggestion"] = "Sugestão";
  revision_pretty_text["SuggestionID"] = "Sugestão";

  var objectUrl;
  if (object.__typename === "Post") {
    objectUrl = `/blog/${object.url}`;
  } else if (object.__typename === "Page") {
    objectUrl = `/${object.url}`;
  } else if (object.__typename === "Comment") {
  } else if (object.__typename === "LifeNode") {
    objectUrl = `/${object.slug}-p${object.idInt}`;
  }

  if (object.__typename === "Comment") {
    var comment = object;

    revision_body = (
      <Typography variant="body2" component="p">
        {comment.body}
      </Typography>
    );
  }

  if (object.__typename === "LifeNode") {
    var plant = object;
    const mainImage = _.get(plant, "mainImage.edges[0].node");

    revision_body = (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <div>
              {mainImage ? (
                <ImageThumbnail
                  alt={plant.title}
                  image={mainImage}
                  src={mainImage.smallImage.url}
                  className={classes.mainImage}
                />
              ) : (
                <ImgDefault alt={plant.title} className={classes.mainImage} />
              )}
            </div>
            <EdibilityBadge plant={plant} />
            <RankDisplay plant={plant} />
          </Grid>
          <Grid item xs={12} md={9}>
            <PageTitle>{plant.title}</PageTitle>
            <Typography variant="body1" className={classes.marginBottom}>
              {plant.description}
            </Typography>
            {plant.commonNames.edges.length > 0 && (
              <div>
                <Typography variant="h6">Nomes comuns</Typography>
                <ul>
                  {plant.commonNames.edges.map((edge) => {
                    const commonName = edge.node;
                    return (
                      <li key={commonName.id}>
                        {commonName.name}{" "}
                        {commonName.language ? `(${commonName.language})` : ""}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {/*<TaxoClimb lifeNode={plant} />*/}
            <Typography variant="h6">Fotos</Typography>
            <Grid container spacing={3}>
              {plant.images.edges.map((edge) => {
                const image = edge.node;
                return (
                  <Grid item xs={3} key={image.id} className={classes.gridItem}>
                    <ImageThumbnail
                      alt={plant.title}
                      image={image}
                      src={image.smallImage.url}
                      className={classes.img}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  if (object.__typename === "Post") {
    var post = object;

    revision_body = (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PageTitle>{post.title}</PageTitle>
        </Grid>
        <Grid item xs={12}>
          Enviada por <ProfileLink user={post.revisionCreated.author} />{" "}
          <RelativeDate date={post.publishedAt} />
          <span>. </span>
        </Grid>
        <Grid item xs={12}>
          <JsxParser jsx={post.body} environment={environment} />
        </Grid>
      </Grid>
    );
  }

  if (object.__typename === "Page") {
    var page = object;

    revision_body = (
      <div>
        <PageTitle>{page.title}</PageTitle>
        <JsxParser jsx={page.body} environment={environment} />
        <div className={classes.actions}>
          Enviada por <ProfileLink user={page.revisionCreated.author} />
          {` `}
          <i className="fa fa-clock-o" aria-hidden="true" />
          {` `}
          <RelativeDate date={page.publishedAt} />
          <span> . </span>
        </div>
      </div>
    );
  }

  // prev and next revision buttons
  if (revision.before !== null) {
    before = (
      <Card className={classes.card}>
        <CardActionArea
          to={`/revisions/revision/${revision.before.id}`}
          component={RouterLink}
        >
          <CardContent>
            <div className={classes.arrowPrev}>
              <ArrowBackIcon />
            </div>
            <div className={classes.arrowPrev}>
              <Typography gutterBottom variant="subtitle1" component="b">
                Alteração anterior
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {revision.before.author && (
                  <span>
                    feita por <strong>{revision.before.author.username}</strong>
                  </span>
                )}{" "}
                <RelativeDate date={revision.before.createdAt} />
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  if (revision.after.edges.length > 0) {
    after = (
      <div>
        {revision.after.edges.map(function (edge, i) {
          var after_rev = edge.node;
          return (
            <Card className={classes.card} key={i}>
              <CardActionArea
                to={`/revisions/revision/${after_rev.id}`}
                component={RouterLink}
              >
                <CardContent>
                  <div className={classes.arrowNext}>
                    <Typography gutterBottom variant="subtitle1" component="b">
                      Próxima alteração
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {after_rev.author && (
                        <span>
                          feita por <strong>{after_rev.author.username}</strong>
                        </span>
                      )}{" "}
                      <RelativeDate date={after_rev.createdAt} />
                    </Typography>
                  </div>
                  <div className={classes.arrowNext}>
                    <ArrowForwardIcon />
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    );
  }

  let current, not_current_alert;
  if (revision.isTip) {
    current = (
      <Chip
        icon={<DoneIcon />}
        label="Atual"
        size="small"
        className={classes.isCurrent}
      />
    );
  } else {
    current = (
      <ButtonWithProgress
        variant="contained"
        color="primary"
        size="small"
        onClick={handleRevisionRevert}
        isLoading={isSaving}
      >
        <HistoryIcon className={classes.leftIcon} /> reverter para esta versão
      </ButtonWithProgress>
    );
    not_current_alert = (
      <Paper className={classes.alert}>
        Você está visualizando a {revision.typeDisplay.toLowerCase()}{" "}
        <b>{revision.idInt}</b> feita por <ProfileLink user={revision.author} />{" "}
        <RelativeDate date={revision.createdAt} />. Esta revisão pode ser muito
        diferente da última feita na página.
      </Paper>
    );
  }

  return (
    <Width>
      <Helmet title={`Revisão: ${revision.id}`} />
      <BreadcrumbsWithHome>
        <BreadcrumbsItem to={objectUrl}>{object.title}</BreadcrumbsItem>
        <BreadcrumbsItem to={`/revisions/${object.id}`}>
          Historico de alterações
        </BreadcrumbsItem>
        <BreadcrumbsItem to={`/revisions/revision/${revision.id}`}>
          Revisão
        </BreadcrumbsItem>
      </BreadcrumbsWithHome>
      {not_current_alert}
      <Card className={classes.cardRoot}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              {`${revision_pretty_text[revision.object.__typename]}: ${
                revision.id
              }`}
            </Grid>
            <Grid item xs={12} md={6} className={classes.textRight}>
              {current}
            </Grid>
            <Grid item xs={12} className={classes.revBody}>
              <Divider style={{ marginBottom: 20 }} />
              {revision_body}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid container spacing={10}>
        <Grid item xs={6}>
          {before}
        </Grid>
        <Grid item xs={6} className={classes.textRight}>
          {after}
        </Grid>
      </Grid>
    </Width>
  );
}

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  actions: {
    borderTop: `1px solid ${theme.palette.grey["300"]}`,
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: theme.palette.grey["600"],
  },
  cardRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  revBody: {
    marginTop: theme.spacing(1),
  },
  isCurrent: {
    background: "#4caf50",
    color: "#FFF",
  },
  alert: {
    background: "#fff3cd",
    padding: theme.spacing(2),
    color: "#000",
  },
  textRight: {
    textAlign: "right",
  },
  arrowPrev: {
    display: "inline-block",
    padding: "0 5px",
    verticalAlign: "middle",
  },
  arrowNext: {
    display: "inline-block",
    padding: "0 5px",
    verticalAlign: "middle",
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  // plants
  mainImage: {
    width: "100%",
  },
  gridItem: {
    lineHeight: 0,
  },
  img: {
    width: "100%",
  },
});

export default withStyles(styles)(RevisionItem);
