import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core";
import { Width } from "../ui";
import PageTitle from "../lib/PageTitle.js";
import Link from "../lib/Link.js";
import NotFound from "../pages/NotFound.js";
import WhatIsThis from "./identify/WhatIsThis.js";
import OccurrenceDetails from "./OccurrenceDetails.js";
import SingleHeader from "../lib/SingleHeader.js";
import { ToolbarHeaderContext } from "../ToolbarHeaderContext.js";

function OccurrencePage(props) {
  const {
    occurrence,
    relay: { environment },
  } = props;

  const toolbarContext = useContext(ToolbarHeaderContext);
  useEffect(() => {
    toolbarContext.setToolbarHeader(
      <SingleHeader>Pedido de identificação</SingleHeader>
    );
  }, []);

  if (!occurrence) {
    return <NotFound />;
  }

  let headerTitle = `Pedido de identificação: ${occurrence.idInt}`;
  let title = `Pedido de identificação: ${occurrence.idInt}`;

  if (!occurrence.isRequest) {
    const plant = occurrence.identity;
    const plantTitle = plant.commonName
      ? `${plant.commonName.name} (${plant.title})`
      : plant.title;

    headerTitle = `Individuo da espécie ${plantTitle}`;
    title = (
      <React.Fragment>
        Individuo da espécie{" "}
        <Link to={`/${plant.slug}-p${plant.idInt}`}>{plantTitle}</Link>
      </React.Fragment>
    );
  }

  return (
    <Width>
      <Helmet title={headerTitle}>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PageTitle>{title}</PageTitle>

      {occurrence.isRequest ? (
        <WhatIsThis occurrence={occurrence} environment={environment} />
      ) : (
        <OccurrenceDetails occurrence={occurrence} environment={environment} />
      )}
    </Width>
  );
}

const styles = (theme) => ({});

export default withStyles(styles)(OccurrencePage);
