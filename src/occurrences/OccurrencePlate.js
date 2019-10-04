import React from 'react';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core';
import QRCode from 'qrcode.react';
import _ from 'lodash';
import NotFound from '../pages/NotFound.js';

import logoImg from '../assets/queplanta-icon.svg';
import logoTextImg from '../assets/queplanta-text-dark.svg';

import parceriasImg from '../assets/parcerias-sustentaveis.png';

function OccurrencePlatePage(props) {
  const {classes, occurrence} = props

  if (!occurrence) {
    return <NotFound />
  }

  const title = `Placa para corrência de ${occurrence.identity.title}`
  const commonName = _.get(occurrence.identity, 'commonName.name');
  const url = `https://queplanta.com/ocorrencias/${occurrence.id}`;

  return <div>
    <Helmet
      title={title}
    >
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className={classes.mainTitle}>
      {commonName ? commonName : occurrence.identity.title}
    </div>
    {commonName && <div className={classes.secundaryTitle}>
      {occurrence.identity.title}
    </div>}

    <img src={logoImg} width="50" alt="" />
    <img src={logoTextImg} alt="" />

    <img src={parceriasImg} alt="" />

    <QRCode value={url} />
  </div>
}

const styles = (theme) => ({
  mainTitle: {
    backgroundColor: 'green',
    textTransform: 'capitalize',
    color: 'white',
    padding: theme.spacing(2),
    fontSize: 32,
    fontWeight: 'bold',
  }
})

export default withStyles(styles)(OccurrencePlatePage)
