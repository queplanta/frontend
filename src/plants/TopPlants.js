import React from 'react';
import {
  List, ListItem, ListItemText, ListItemAvatar,
  Avatar, Typography, Divider, Paper,
  withStyles
} from '@material-ui/core';
import { Link as RouterLink } from 'found';

const items = [
  {
    title: 'Mangifera Indica',
    names: ['Manga'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Manga_1.jpg',
    path: '/mangifera-indica-p385479'

  },
  {
    title: 'Lecythis pisonis',
    names: ['Sapucaia', 'Cumbuca de macaco', 'Marmita de macaco'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Sapucaia.jpg',
    path: '/lecythis-pisonis-p200362'
  },
  {
    title: 'Theobroma cacao',
    names: ['Cacaueiro'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Cocoa_Pods.JPG',
    path: '/theobroma-cacao-p335229'
  },
  {
    title: 'Plinia cauliflora',
    names: ['Jabuticaba'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Jabuticaba_fruto.jpg',
    path: '/plinia-cauliflora-p349060'
  },
]

const TopPlants = ({classes}) => {
  return <Paper className={classes.root} elevation={1}>
    <Typography component="h3" variant="h5" className={classes.title}>Espécies mais populares do mês</Typography>
    <List>
      {items.map((item, i) => {
        return <React.Fragment key={i}>
          {i > 0 && <Divider component="li" />}
          <ListItem button component={RouterLink} to={item.path}>
            <ListItemAvatar>
              <Avatar
                alt={item.title}
                src={item.image}

              />
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              secondary={<React.Fragment>
                {item.names.map((name, nameIndex) => {
                  return <span key={nameIndex}>{name}</span>
                })}
              </React.Fragment>}
            />
          </ListItem>
        </React.Fragment>
      })}
    </List>
  </Paper>
}

const styles = (theme) => ({
  root: {
  },
  title: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  actionRoot: {
    right: theme.spacing(2),
  },
})

export default withStyles(styles)(TopPlants)
