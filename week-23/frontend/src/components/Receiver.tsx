import { useEffect, useRef, useState } from 'react'

const Receiver = () => {

    const [socket, setSocket] = useState<null | WebSocket>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null); // Persist the RTCPeerConnection

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setSocket(socket);

        socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'receiver' }));
        };

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if (!pcRef.current) {
                pcRef.current = new RTCPeerConnection();

                pcRef.current.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.send(JSON.stringify({ type: 'addIceCandidate', candidate: event.candidate }));
                    }
                };

                pcRef.current.ontrack = (event) => {
                    console.log('track received', event);
                    if (videoRef.current) {
                        videoRef.current.srcObject = event.streams[0] || new MediaStream([event.track]);
                    }
                };
            }

            const pc = pcRef.current;

            if (message.type === 'offer') {
                await pc.setRemoteDescription(message.sdp);
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                socket.send(JSON.stringify({ type: 'createAnswer', sdp: pc.localDescription }));
            } else if (message.type === 'iceCandidate') {
                try {
                    await pc.addIceCandidate(message.candidate);
                } catch (err) {
                    console.error('Failed to add ICE candidate:', err);
                }
            }
        };

        return () => {
            socket.close();
            if (pcRef.current) {
                pcRef.current.close();
                pcRef.current = null;
            }
        };
    }, []);

    return (
        <>
            <div>Receiver</div> <br />
            <video ref={videoRef} autoPlay playsInline></video>
        </>
    )
}

export default Receiver