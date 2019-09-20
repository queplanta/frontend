// Express requirements
import bodyParser from 'body-parser';
import express from 'express';
import proxy from 'http-proxy-middleware';
import morgan from 'morgan';
import path from 'path';
// import Loadable from 'react-loadable';
// import cookieParser from 'cookie-parser';

// Our loader - this basically acts as the entry point for each page load
import renderOnServer from '../renderOnServer';

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 3000;

// NOTE: UNCOMMENT THIS IF YOU WANT THIS FUNCTIONALITY
/*
  Forcing www and https redirects in production, totally optional.

  http://mydomain.com
  http://www.mydomain.com
  https://mydomain.com

  Resolve to: https://www.mydomain.com
*/
// if (process.env.NODE_ENV === 'production') {
//   app.use(
//     forceDomain({
//       hostname: 'www.mydomain.com',
//       protocol: 'https'
//     })
//   );
// }

// Compress, parse, log, and raid the cookie jar
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
// app.use(cookieParser());

// Set up homepage, static assets, and capture everything else
app.use('/graphql', proxy({target: 'http://queplanta.com/graphql', changeOrigin: true}));
app.use('/public', proxy({target: 'http://queplanta.com/public', changeOrigin: true}));
app.use(express.Router().get('/', renderOnServer));
app.use(express.static(path.resolve(__dirname, '../../build')));
app.use(renderOnServer);

// We tell React Loadable to load all required assets and start listening - ROCK AND ROLL!
// Loadable.preloadAll().then(() => {
  app.listen(PORT, console.log(`App listening on port ${PORT}!`));
// });

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});