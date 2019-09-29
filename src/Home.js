import React from 'react';
import Route from './relay/RouteWithLoading';
import { Grid, Paper, Typography, Button, Link, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'found';
import { Width } from './ui'
import HomeQuery from './Home.query.js';
import LatestWhatIsThis from './occurrences/identify/LatestWhatIsThis.js';
import PostList from './blog/PostList.js';
import TopPlants from './plants/TopPlants.js';

function Home(props) {
	const {classes, viewer} = props;
  return <Width component="div">
		<Grid container spacing={3} alignItems="flex-start">
			{/*<Grid item xs={12}>
        <Paper className={classes.jumbotron}>
          <Typography variant="h2" component="span">
            Identifique plantas por fotos de forma colaborativa,
            Encontre arvores em sua cidade,
            Catalogue sua coleção e troque sementes com amigos.
          </Typography>
          <Typography variant="h1" component="span"><Link component={RouterLink} to="/identificacao">Que planta é essa?</Link></Typography>
          <Typography variant="h2" component="span"><Link component={RouterLink} to="/mangifera-indica-p385479">Essa planta é comestível?</Link></Typography>
          <Typography variant="h3" component="span"><Link component={RouterLink} to="/ocorrencias">Quais arvores frutiferas são encontradas na minha cidade?</Link></Typography>
          <Typography>Descubra as respostas para estas e outras perguntas...</Typography>
          <Button variant="outlined" color="primary">Conheça mais</Button> e <Button variant="outlined">Como funciona</Button>
        </Paper>
      </Grid>*/}
			<Grid item xs={12} sm={6}>
        <Typography component="h3" variant="h5" className={classes.titleWhat}>Últimos pedidos de identificação</Typography>
        <LatestWhatIsThis identified={false} viewer={viewer} environment={props.environment} />
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={12} className={classes.gridPaddingBottom}>
          <TopPlants />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography component="h3" variant="h5" className={classes.title}>Últimas atualizações</Typography>
            <PostList viewer={viewer} title="Últimas atualizações" count={10} />
          </Paper>
        </Grid>
			</Grid>
		</Grid>
	</Width>
}

const styles = (theme) => ({
  titleWhat: {
    paddingBottom: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  gridPaddingBottom: {
    paddingBottom: theme.spacing(2),
  },
  jumbotron: {
    padding: theme.spacing(4),
    '& > span':  {
      display: 'inline',
      paddingRight: theme.spacing(2),
    },
    '& > p': {
      margin: theme.spacing(2, 0),
    },
  }
})

const HomeStyled = withStyles(styles)(Home)

export const homeRoute = <Route
	query={HomeQuery}
  render={(args) => <HomeStyled {...args.props} environment={args.environment} />}
/>
