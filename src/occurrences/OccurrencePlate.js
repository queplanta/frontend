import React from "react";
import Helmet from "react-helmet";
import { Grid, withStyles } from "@material-ui/core";
import QRCode from "qrcode.react";
import _ from "lodash";
import NotFound from "../pages/NotFound.js";

import logoImg from "../assets/queplanta-icon.svg";
import logoTextImg from "../assets/queplanta-text-dark.svg";

import parceriasImg from "../assets/parcerias-sustentaveis.svg";

function OccurrencePlatePage(props) {
  const { classes, occurrence, urlShortner } = props;

  if (!occurrence) {
    return <NotFound />;
  }

  const title = `Placa para corrência de ${occurrence.identity.title}`;
  const commonName = _.get(occurrence.identity, "commonName.name");
  const url = `https://queplanta.com/observacoes/${occurrence.id}`;

  const family = _.find(occurrence.identity.parents, { rank: "FAMILY" });

  return (
    <div>
      <Helmet title={title}>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className={classes.mainTitle}>
        {commonName ? commonName : occurrence.identity.title}
      </div>
      <Grid container spacing={2} className={classes.contentWrapper}>
        <Grid item xs={9} className={classes.content}>
          {commonName && (
            <div className={classes.secundaryTitle}>
              Nome científico: <strong>{occurrence.identity.title}</strong>
            </div>
          )}

          {family && (
            <div>
              Família: <strong>{family.title}</strong>
            </div>
          )}

          {urlShortner && (
            <div>
              <br />
              Mais informações:{" "}
              <strong>www.queplanta.com.br/s/{urlShortner}</strong>
            </div>
          )}

          <div className={classes.logos}>
            <img
              src={logoImg}
              width="45"
              alt=""
              className={classes.quePlantaLogoIcon}
            />
            <img src={logoTextImg} height="25" alt="" />

            <img src={parceriasImg} alt="" className={classes.angloLogo} />
          </div>
        </Grid>
        <Grid item xs={3} style={{ textAlign: "right", paddingTop: 80 }}>
          <QRCode value={url} size={115} />
        </Grid>
      </Grid>
    </div>
  );
}

const styles = (theme) => ({
  mainTitle: {
    backgroundColor: "green",
    textTransform: "capitalize",
    color: "white",
    padding: theme.spacing(2),
    fontSize: 42,
    fontWeight: "bold",
  },
  logos: {
    verticalAlign: "middle",
    position: "absolute",
    bottom: 8,
    "& img": {
      verticalAlign: "middle",
    },
  },
  contentWrapper: {
    padding: theme.spacing(2),
    fontSize: 22,
  },
  content: {
    position: "relative",
  },
  quePlantaLogoIcon: {
    marginRight: theme.spacing(1),
  },
  angloLogo: {
    marginLeft: theme.spacing(5),
    height: 52,
  },
});

export default withStyles(styles)(OccurrencePlatePage);
