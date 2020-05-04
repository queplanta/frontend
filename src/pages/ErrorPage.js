import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import Helmet from 'react-helmet';
import { Width } from '../ui'

function ErrorPage(props) {
  const {classes} = props

  return <Width>
    <Helmet
      title="Erro"
      meta={[
        {"name": "status", "content": "500"}
      ]}
    />
    <Typography component="h5" variant="h4" className={classes.title}>
      Semente não germinou... por favor regue novamente.
    </Typography>
    <Typography>
      Se o problema persistir envie um email para <a href="mailto:problema@queplanta.com">problema@queplanta.com</a>, por favor descreva com o maximo de detalhes possivel.
    </Typography>
  </Width>
}

const styles = () => ({
})

export default withStyles(styles)(ErrorPage)
