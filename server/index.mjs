
// Dependencies
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import path from 'path';
import WebSocket from 'ws';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import devConfig from '../config/webpack.dev';

// Constants
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PROD = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 8080;

// Apply middleware
app.use(helmet());

// Conditionally use webpack dev middleware in development
if (PROD) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
  });
} else {
  const compiler = webpack(devConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
    noInfo: true,
  }));

  app.use('*', (req, res, next) => {
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

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const { message } = JSON.parse(data);
    const packet = { message };

    wss.clients.forEach((client) => {
      client.send(JSON.stringify(packet));
    });
  });
});

server.listen(PORT, () => {
  console.log('Listening on %d', server.address().port);
});
