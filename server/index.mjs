
// Dependencies
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import path from 'path';
import WebSocket from 'ws';
import pgp from 'pg-promise';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import devConfig from '../config/webpack.dev';

// Middleware
import { wsAuthMiddleware } from './middleware/authentication.mjs';

// Routers
import authRouter from './routers/authentication.mjs';
import apiRouter from './routers/api.mjs';

// Initialize environment variables
dotenv.config();

// Constants
const app = express();
const server = http.createServer(app);
const {
  PORT = 8080,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;
const postgres = pgp();
const db = postgres(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
const wss = new WebSocket.Server({
  verifyClient: wsAuthMiddleware,
  server,
});

// Apply middleware
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

// Handle WebSocket server connections
wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const { message } = JSON.parse(data);
    const packet = { message };

    wss.clients.forEach((client) => {
      client.send(JSON.stringify(packet));
    });
  });
});

// Bind routers to app instance
app.use('/login', authRouter(db));
app.use('/api', apiRouter(db));

if (process.env.NODE_ENV === 'production') {
  // Serve the index for all unmatched GET requests
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
  });
} else {
  // Conditionally use webpack dev middleware in development
  const compiler = webpack(devConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
    noInfo: true,
  }));

  // When using webpack dev server, serve the index from the middleware's in-memory fs
  app.get('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');

    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        next(err);
      } else {
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
      }
    });
  });
}

server.listen((PORT), () => {
  console.log('Listening on %d', server.address().port);
});
