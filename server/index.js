
// Dependencies

const http = require('http');
const url = require('url');
const path = require('path');
const WebSocket = require('ws');
const express = require('express');
const helmet = require('helmet');

// Constants

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({
  server,
});
const PROD = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 8080;

// Apply middlewares

app.use(helmet());
if (PROD) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
  });
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('../config/webpack.dev.js');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    silent: true,
    stats: 'errors-only',
    noInfo: true,
  }));

  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath,'index.html');

    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) return next(err);
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });
}

wss.on('connection', (ws, req) => {
  console.log('user connected');

  ws.on('message', (data) => {
    const {
      message,
    } = JSON.parse(data);
    const packet = {
      message,
    };

    wss.clients.forEach((ws) => {
      ws.send(JSON.stringify(packet));
    });
  });
});

server.listen(PORT, () => {
  console.log('Listening on %d', server.address().port);
});
