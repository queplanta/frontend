import React from 'react';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core';
import { Width } from '../ui';
import PageTitle from '../lib/PageTitle.js';
import Link from '../lib/Link.js';
import NotFound from '../pages/NotFound.js';
import WhatIsThis from './identify/WhatIsThis.js';
import OccurrenceDetails from './OccurrenceDetails.js';

function OccurrencePage(props) {
  const {occurrence, environment} = props

  if (!occurrence) {
    return <NotFound />
  }

  const plant = occurrence.identity;
  const plantTitle = plant.commonName ? `${plant.commonName.name} (${plant.title})` : plant.title;

  const headerTitle = occurrence.isRequest ? `Pedido de identificação: ${occurrence.idInt}` : `Observação de ${plantTitle}`;

  const title = occurrence.isRequest ? `Pedido de identificação: ${occurrence.idInt}` : <React.Fragment>
    Observação de <Link to={`/${plant.slug}-p${plant.idInt}`}>{plantTitle}</Link>
  </React.Fragment>;

  return <Width>
    <Helmet
      title={headerTitle}
    >
      <meta name="robots" content="noindex" />
    </Helmet>
    <PageTitle>{title}</PageTitle>
    
    {occurrence.isRequest ?
      <WhatIsThis occurrence={occurrence} environment={environment} />
      :
      <OccurrenceDetails occurrence={occurrence} environment={environment} />
    }
  </Width>
}

const styles = (theme) => ({
})

export default withStyles(styles)(OccurrencePage)
