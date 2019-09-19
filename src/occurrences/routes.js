import React from 'react';
import Route from '../relay/RouteWithLoading';
import Home from './Home.js';
import HomeQuery from './Home.query.js';
import OccurrenceAdd from './OccurrenceAdd.js';
import OccurrenceAddQuery from './OccurrenceAdd.query.js';
import HomeIdentify from './identify/Home.js';
import HomeIdentifyQuery from './identify/Home.query.js';
import HomeIdentified from './identify/HomeIdentified.js';
import IdentifyPage from './identify/IdentifyPage.js';
import IdentifyPageQuery from './identify/IdentifyPage.query.js';
import Occurrence from './Occurrence.js';
import OccurrenceQuery from './Occurrence.query.js';

export const occurrencesRoutes = <React.Fragment>
  <Route
    path="/ocorrencias"
    query={HomeQuery}
    render={(args) => {
      return <Home {...args.props} environment={args.environment} />
    }}
  />
  <Route
    path="/ocorrencias/adicionar"
    query={OccurrenceAddQuery}
    render={(args) => {
      return <OccurrenceAdd {...args.props} environment={args.environment} />
    }}
  />
  <Route
    path="/identificacao"
    query={HomeIdentifyQuery}
    render={(args) => {
      return <HomeIdentify {...args.props} environment={args.environment} />
    }}
  />
  <Route
    path="/identificacao/identificadas"
    query={HomeIdentifyQuery}
    render={(args) => {
      return <HomeIdentified {...args.props} environment={args.environment} />
    }}
  />
  <Route
    path="/identificacao/pedido"
    query={IdentifyPageQuery}
    render={(args) => {
      return <IdentifyPage {...args.props} environment={args.environment} />
    }}
  />
  <Route
    path="/ocorrencias/:id"
    query={OccurrenceQuery}
    render={(args) => {
      return <Occurrence {...args.props} environment={args.environment} />
    }}
  />
</React.Fragment>
