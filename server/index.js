
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

app.use(helmet());

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client', 'index.html'))
});

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
