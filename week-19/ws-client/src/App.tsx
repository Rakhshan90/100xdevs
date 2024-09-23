import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMsg, setLatestMsg] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);

      socket.onmessage = (message) => {
        setLatestMsg(message.data);
      }
    }

    return () => {
      socket.close();
    }
  }, []);

  if (!socket) {
    return <div>Connection to socker server...</div>
  }

  return (
    <>
      <div>
        {latestMsg}
      </div> <br />
      <input type="text" onChange={(e)=> setMessage(e.target.value)} /> <br />
      <button onClick={() => socket.send(message)}>Send</button> <br />
    </>
  )
}

export default App
