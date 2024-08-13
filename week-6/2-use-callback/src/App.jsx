import { memo, useCallback, useState } from 'react'
import './App.css'
import { Assignment1 } from './components/Assignment1'
import { Assignment2 } from './components/Assignment2'


function App() {
  // const [counter, setCounter] = useState(0);
  // let a = 1;
  // function a(){
  //   console.log("a");
  // }

  // const a = useCallback(function(){
  //   console.log("a");
  // }, [])

  return (
    <>
      {/* <Assignment1 /> */}
      <Assignment2 />
      {/* <button onClick={() => setCounter(counter + 1)}>Count {counter}</button>
      <Demo a={a} /> */}
    </>
  )
}

// const Demo = memo(function Demo({ a }) {
//   console.log("re-render");
//   return <div>
//     {a}
//   </div>
// })

export default App
