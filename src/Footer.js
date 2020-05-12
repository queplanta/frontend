import React from "react";
import { Grid, Link, withStyles } from "@material-ui/core";
import { Link as RouterLink } from "found";
import { Width } from "./ui";
import logoImg from "./assets/logo-queplanta.png";
import parceriasImg from "./assets/parcerias-sustentaveis.png";

function Footer(props) {
  const { classes } = props;
  return (
    <Width component="footer">
      <Grid container spacing={3} className={classes.footer}>
        <Grid item xs={12} className={classes.links}>
          <Link to={`/blog`} component={RouterLink}>
            Blog
          </Link>
          {` . `}
          <Link to={`/o-que-e`} component={RouterLink}>
            O que é
          </Link>
          {` . `}
          <Link to={`/como-funciona`} component={RouterLink}>
            Como Funciona
          </Link>
          {` . `}
          <Link to={`/contribua`} component={RouterLink}>
            Contribua
          </Link>
          {` . `}
          <Link to={`/diretorio/membros/a`} component={RouterLink}>
            Membros
          </Link>
          {` . `}
          <Link to={`/termos-de-uso`} component={RouterLink}>
            Termos de Uso
          </Link>
        </Grid>
        <Grid item xs={12} md={7}>
          <div className={classes.description}>
            <img src={logoImg} alt="Que Planta" className={classes.logo} />
            Que Planta,{" "}
            <Link
              href="https://github.com/queplanta"
              target="_blank"
              rel="noopener noreferrer"
            >
              software de código aberto
            </Link>
            .
            <br />
            Este obra está licenciada com{" "}
            <Link
              href="http://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="license noopener noreferrer"
            >
              Creative Commons Atribuição 4.0 Internacional
            </Link>
            .
          </div>
        </Grid>
        <Grid item xs={12} md={5} className={classes.parcerias}>
          <img
            src={parceriasImg}
            alt="Parcerias Sustentáveis | AngloGoldAshanti"
            className={classes.parceriasImg}
          />
        </Grid>
      </Grid>
    </Width>
  );
}

const styles = (theme) => ({
  links: {
    textAlign: "center",
  },
  description: {
    paddingTop: 7,
  },
  logo: {
    height: 50,
    float: "left",
    marginRight: 20,
    marginTop: -7,
  },
  parcerias: {
    textAlign: "right",
  },
  parceriasImg: {
    height: 50,
  },
  footer: {
    marginBottom: 56,
  },
});

export default withStyles(styles)(Footer);
