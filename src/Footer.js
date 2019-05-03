import React from 'react';
import { Grid, Link, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'found';
import { Width } from './ui'

function Footer(props) {
  const {classes} = props;
  return <Width component="footer">
		<Grid container spacing={24}>
			<Grid item xs={12} md={6}>
				Que Planta, <Link href="https://github.com/queplanta" target="_blank" rel="noopener noreferrer">software de código aberto</Link>.
				<br />
				Este obra está licenciada com <Link href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="license noopener noreferrer">Creative Commons Atribuição 4.0 Internacional</Link>.
			</Grid>
			<Grid item xs={12} md={6} className={classes.links}>
				<Link to={`/blog`} component={RouterLink}>Blog</Link>
				{` . `}
				<Link to={`/o-que-e`} component={RouterLink}>O que é</Link>
				{` . `}
				<Link to={`/como-funciona`} component={RouterLink}>Como Funciona</Link>
				{` . `}
				<Link to={`/contribua`} component={RouterLink}>Contribua</Link>
				{` . `}
				<Link to={`/termos-de-uso`} component={RouterLink}>Termos de Uso</Link>
			</Grid>
		</Grid>
	</Width>
}

const styles = (theme) => ({
	links: {
		textAlign: 'right',
	},
})

export default withStyles(styles)(Footer)
