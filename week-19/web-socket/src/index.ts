import WebSocket, { WebSocketServer } from 'ws';
import express, {Express, Request, Response} from 'express';
// import http from 'http';

// const server = http.createServer(function(request: any, response: any) {
//     console.log((new Date()) + ' Received request for ' + request.url);
//     response.end("hi there");
// });

// const wss = new WebSocketServer({ server });

// let clientConnected = 0;
// wss.on('connection', function connection(ws) {
//   ws.on('error', console.error);

//   ws.on('message', function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(data, { binary: isBinary });
//         }
//     });
// });

//   console.log("Clients: ", ++clientConnected);
//   ws.send('Hello! Message From Server!!');
// });

// server.listen(8080, function() {
//     console.log((new Date()) + ' Server is listening on port 8080');
// });


const app:Express = express()
const httpServer = app.listen(8080, function(){
    console.log(`server listening on port 8080`);
})

const wss = new WebSocketServer({ server: httpServer });

let clients = 0;
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  console.log(`clients ${++clients}`)
  ws.send('Hello! Message From Server!!');
});