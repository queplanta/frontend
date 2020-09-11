import React from "react";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core";
import HomeTabs from "./HomeTabs.js";
import PageTitle from "../../lib/PageTitle.js";
import LatestWhatIsThis from "./LatestWhatIsThis.js";
import BreadcrumbsWithHome from "../../lib/BreadcrumbsWithHome.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function Home(props) {
  const { viewer, environment } = props;

  return (
    <HomeTabs>
      <Helmet title="Identificação" />
      <BreadcrumbsWithHome>
        <BreadcrumbsItem to="/identificacao">Identificação</BreadcrumbsItem>
        <BreadcrumbsItem to="/identificacao/identificadas">
          Identificadas
        </BreadcrumbsItem>
      </BreadcrumbsWithHome>
      <PageTitle>Últimos pedidos de identificação</PageTitle>
      <LatestWhatIsThis
        identified={true}
        viewer={viewer}
        environment={environment}
      />
    </HomeTabs>
  );
}

const styles = {};
export default withStyles(styles)(Home);
