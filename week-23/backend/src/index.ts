import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: null | WebSocket = null;
let receiverSocket: null | WebSocket = null;

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data: any) {
        const message = JSON.parse(data);
        // identify-as-sender
        // identify-as-receiver
        // create-offer
        // create-answer
        // add ice candidate
        if (message.type === 'sender') {
            senderSocket = ws;
        }
        else if (message.type === 'receiver') {
            receiverSocket = ws;
        }
        else if (message.type === 'createOffer') {
            receiverSocket?.send(JSON.stringify({ type: 'offer', sdp: message.sdp }));
        }
        else if (message.type === 'createAnswer') {
            senderSocket?.send(JSON.stringify({ type: 'answer', sdp: message.sdp }));
        }
        else if (message.type === 'addIceCandidate') {
            if (ws === senderSocket) {
                receiverSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
            }
            else if (ws === receiverSocket) {
                senderSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
            }
        }
    });

    ws.send('something');
});