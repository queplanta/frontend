import React, { useContext } from "react";
import { Typography, Button, withStyles } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { useRouter } from "found";
import { Width } from "../ui";
import { hasPerm } from "../lib/perms.js";
import { LoginRequiredContext } from "../accounts/LoginRequired.js";
import Link from "../lib/Link.js";

function NotFound(props) {
  const { classes } = props;
  const { currentUser } = useContext(LoginRequiredContext);
  const {
    match: { params },
  } = useRouter();
  const hasUrl = !!params.url;

  return (
    <Width>
      <Helmet
        title="Não encontrada"
        meta={[{ name: "status", content: "404" }]}
      />
      <Typography component="h5" variant="h4" className={classes.title}>
        Página não encontrada
      </Typography>

      {hasPerm(currentUser, "add_page") && hasUrl && (
        <Button
          component={Link}
          variant="outlined"
          to={{
            pathname: "/paginas/nova",
            query: { url: params.url },
          }}
        >
          Criar página?
        </Button>
      )}
    </Width>
  );
}

const styles = () => ({});

export default withStyles(styles)(NotFound);
