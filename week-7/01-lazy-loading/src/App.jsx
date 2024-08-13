// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Suspense, lazy } from 'react';
// const Home = lazy(()=> import  ('./pages/Home'));
// const Dashboard = lazy(()=> import  ('./pages/Dashboard'));
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import Navbar from './components/Navbar';

import { useContext, useState } from "react"
import { CountContext } from "./components/context";

function App() {

  const [count, setCount] = useState(0);

  return (
    <>
      {/* <BrowserRouter>
      <Navbar />        
        <Routes>
          <Route path='/' element={<Suspense fallback={"loading..."}> <Home /> </Suspense>} />
          <Route path='/dashboard' element={<Suspense fallback={"loading..."}> <Dashboard /> </Suspense>} />
        </Routes>
      </BrowserRouter> */}
      <CountContext.Provider value={count}>
        <Count setCount={setCount} />
      </CountContext.Provider>
    </>
  )
}

function Buttons({ setCount }) {
  const count = useContext(CountContext);
  return <div>
    <button onClick={() => setCount(count + 1)}>Increment</button> <br></br>
    <button onClick={() => setCount(count - 1)}>Decrement</button> <br></br>
  </div>
}

function DisplayCount() {
  const count = useContext(CountContext);
  return <div> {count} </div>
}

function Count({ setCount }) {
  console.log("re-render");
  return (
    <div>
      <Buttons setCount={setCount} />
      <DisplayCount />
    </div>
  )
}

export default App
