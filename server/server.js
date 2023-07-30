
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); // Use a different port for WebSocket


// Data to be sent to the React component
const Visrtial = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Client connected.');

  // Send the initial data to the client upon connection
  ws.send(JSON.stringify(Visrtial));

  // Handle messages received from the client
  ws.on('message', (data) => {
    try {
      const newData = JSON.parse(data);
      Visrtial.push(newData);

      // Broadcast the updated data to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(Visrtial));
        }
      });
      console.log(Visrtial);
    } catch (error) {
      console.error('Error parsing incoming message:', error);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
