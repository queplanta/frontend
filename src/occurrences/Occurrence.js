import React from 'react';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core';
import { Width } from '../ui';
import PageTitle from '../lib/PageTitle.js';
import NotFound from '../pages/NotFound.js';
import WhatIsThis from './identify/WhatIsThis.js';

function OccurrencePage(props) {
  const {occurrence, environment} = props

  if (!occurrence) {
    return <NotFound />
  }

  const title = occurrence.isRequest ? `Pedido de identificação: ${occurrence.idInt}` : `Ocorrência de ${occurrence.identity.title}`

  return <Width>
    <Helmet
      title={title}
    >
      <meta name="robots" content="noindex" />
    </Helmet>
    <PageTitle>{title}</PageTitle>
    <WhatIsThis occurrence={occurrence} environment={environment} />;
  </Width>
}

const styles = (theme) => ({
})

export default withStyles(styles)(OccurrencePage)
