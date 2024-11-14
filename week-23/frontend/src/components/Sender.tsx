import { useEffect, useState } from "react"


const Sender = () => {

    const [socket, setSocket] = useState<null | WebSocket>(null);

    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080');
        setSocket(socket);
        socket.onopen = () =>{
            socket.send(JSON.stringify({type: 'sender'}));
        }

    }, []);

    return (
        <div>Sender</div>
    )
}

export default Sender