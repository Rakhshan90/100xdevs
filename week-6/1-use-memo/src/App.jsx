import React, { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Assignment1 } from './components/Assignment1'
import { Assignment2 } from './components/Assignment2'
import { Assignment3 } from './components/Assignment3'

function App() {
  // const [title, setTitle] = useState("My name is rakhshan");
  // const clickHandler = ()=>{
  //   setTitle(`My name is ${Math.random()}`);
  // }
  // const [count, setCount] = useState(0);
  // const [inputVal, setInputVal] = useState(1);
  // const[finalSum, setFinalSum] = useState(0);

  // approach 1 is slightly more optimal than approach 2
  // let sum = useMemo(() => {
  //   let sum = 0;
  //   for (let i = 1; i <= inputVal; i++) {
  //     sum += i;
  //   }
  //   return sum;
  // }, [inputVal]);

  // approach 2
  // useEffect(() => {
  //   let sum = 0;
  //   for (let i = 1; i <= inputVal; i++) {
  //     sum += i;
  //   }
  //   setFinalSum(sum);
  // }, [inputVal])


  return (
    <>
      {/* <Assignment1 /> */}
      {/* <Assignment2 /> */}
      <Assignment3 />

      {/* <button onClick={clickHandler}>Click to change the title</button> */}
      {/* <Header title={title} ></Header> */}
      {/* <ButtonWithRender></ButtonWithRender> */}
      {/* <Header title="My name is rakhshan" ></Header>
      <Header title="My name is rakhshan" ></Header>
      <Header title="My name is rakhshan" ></Header>
      <Header title="My name is rakhshan" ></Header> */}
      {/* <Wrapper>
        hi there
      </Wrapper>
      <Wrapper>
        <input type="text" />
      </Wrapper> */}
      {/* <input onChange={(e) => setInputVal(e.target.value)} type="text" /> <br></br>
      <h1>sum from 1 to {inputVal} is {sum}</h1> <br></br>
      <button onClick={() => setCount(count + 1)}>Count {count}</button> */}
    </>
  )
}

// function ButtonWithRender() {
//   const [title, setTitle] = useState("My name is rakhshan");
//   const clickHandler = () => {
//     setTitle(`My name is ${Math.random()}`);
//   }
//   return <div>
//     <button onClick={clickHandler}>
//       click to change the title
//     </button>
//     <Header title={title} ></Header>
//     <Header title="My name is rakhshan" ></Header>
//     <Header title="My name is rakhshan" ></Header>
//     <Header title="My name is rakhshan" ></Header>
//     <Header title="My name is rakhshan" ></Header>
//   </div>
// }

// const Header = React.memo(
//   function Header({ title }) {
//     return <div>
//       {title}
//     </div>
//   }
// )

// const Wrapper = ({ children }) => {
//   return <div style={{ border: "2px solid gray", padding: "10px" }}>
//     {children}
//   </div>
// }



export default App
