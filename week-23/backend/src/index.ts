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
            console.log('sender set');
            senderSocket = ws;
        }
        else if (message.type === 'receiver') {
            receiverSocket = ws;
            console.log('receiver set');
        }
        else if (message.type === 'createOffer') {
            console.log('offer received');
            receiverSocket?.send(JSON.stringify({ type: 'offer', sdp: message.sdp }));
        }
        else if (message.type === 'createAnswer') {
            console.log('answer received');
            senderSocket?.send(JSON.stringify({ type: 'answer', sdp: message.sdp }));
        }
        else if (message.type === 'addIceCandidate') {
            console.log('addIceCandidate');
            if (ws === senderSocket) {
                console.log('ice candidate added on receiver');
                receiverSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
            }
            else if (ws === receiverSocket) {
                console.log('ice candidate added on sender');
                senderSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
            }
        }
    });

    ws.send('something');
});