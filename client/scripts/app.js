
import 'babel-polyfill';
import '../styles/app.css';

const ws = new WebSocket('ws://localhost:8080');
const form = document.getElementById('message-form');
const messages = document.getElementById('messages');
var connected = false;
ws.addEventListener('open', function() {
  console.log('connected');
  connected = true;
});

ws.addEventListener('message', function({
  data,
}) {
  const {
    message,
  } = JSON.parse(data);
  const div = document.createElement('DIV');
  div.textContent = message;
  messages.appendChild(div);
});

form.addEventListener('submit', function(event) {
  if (!connected) return;
  event.preventDefault();
  const formData = new FormData(event.target);
  const json = {};
  for (const [key, value] of formData.entries()) json[key] = value;
  const data = JSON.stringify(json);
  ws.send(data);
});
