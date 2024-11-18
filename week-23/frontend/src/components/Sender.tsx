import { useEffect, useState } from "react"


const Sender = () => {

    const [socket, setSocket] = useState<null | WebSocket>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setSocket(socket);
        socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'sender' }));
        }
    }, []);

    const sendVideo = async () => {
        if (!socket) return;
        const pc = new RTCPeerConnection();
        pc.onnegotiationneeded = async () => {
            console.log('On negotiation needed')
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket?.send(JSON.stringify({ type: 'createOffer', sdp: pc.localDescription }));
        }
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket?.send(JSON.stringify({ type: 'addIceCandidate', candidate: event.candidate }));
            }
        }

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'answer') {
                await pc.setRemoteDescription(message.sdp);
            } else if (message.type === 'iceCandidate') {
                await pc.addIceCandidate(message.candidate);
            }
        }

        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
        pc.addTrack(stream.getVideoTracks()[0]);
    }

    return (
        <div>
            <h1>Sender</h1> <br></br>
            <button onClick={sendVideo}>Send</button>
        </div>

    )
}

export default Sender