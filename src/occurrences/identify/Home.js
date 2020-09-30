import React from "react";
import { Helmet } from "react-helmet";
import { Hidden, withStyles } from "@material-ui/core";
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
      <Hidden mdUp>
        <BreadcrumbsWithHome>
          <BreadcrumbsItem to="/identificacao">Identificação</BreadcrumbsItem>
        </BreadcrumbsWithHome>
      </Hidden>
      <PageTitle>Últimos pedidos de identificação</PageTitle>
      <LatestWhatIsThis
        identified={false}
        viewer={viewer}
        environment={environment}
      />
    </HomeTabs>
  );
}

const styles = {};
export default withStyles(styles)(Home);
