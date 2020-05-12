import React from "react";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core";
import HomeTabs from "./HomeTabs.js";
import PageTitle from "../../lib/PageTitle.js";
import LatestWhatIsThis from "./LatestWhatIsThis.js";

function Home(props) {
  const { viewer, environment } = props;

  return (
    <HomeTabs>
      <Helmet title="Identificação" />
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
