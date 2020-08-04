import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core";
import HomeTabs from "./HomeTabs.js";
import PageTitle from "../../lib/PageTitle.js";
import LatestWhatIsThis from "./LatestWhatIsThis.js";
import SingleHeader from "../../lib/SingleHeader.js";
import { ToolbarHeaderContext } from "../../ToolbarHeaderContext.js";

function Home(props) {
  const { viewer, environment } = props;

  const toolbarContext = useContext(ToolbarHeaderContext);
  useEffect(() => {
    toolbarContext.setToolbarHeader(
      <SingleHeader>Pedidos de identificação</SingleHeader>
    );
  }, []);

  return (
    <HomeTabs>
      <Helmet title="Identificação" />
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
