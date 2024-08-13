import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { countAtom, evenSelector } from "./store/atoms/count"
import { useMemo } from "react"

function App() {

  return (
    <>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </>
  )
}

function Count() {
  console.log('re-render')
  return (
    <div>
      <DisplayCount />
      <Buttons />
      <DisplayText />
    </div>
  )
}

function Buttons() {
  // const [count, setCount] = useRecoilState(countAtom);
  const setCount = useSetRecoilState(countAtom);
  console.log('re-render');
  // setCount(count + 1);
  // setCount(count => count + 1);
  // setCount(function(count){return count + 1});
  return (
    <div>
      {/* <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button> */}
      <button onClick={() => setCount(count => count + 1)}>Increment</button>
      <button onClick={() => setCount(count => count - 1)}>Decrement</button>
    </div>
  )
}

function DisplayCount() {
  const count = useRecoilValue(countAtom);
  return <div>
    {count}
  </div>
}

function DisplayText() {
  // approach 1 (not really great) // re-render upon every time state changes
  // const count = useRecoilValue(countAtom);
  // const even = count % 2

  // approach 2 (great for optimization) (As we know whenever there is derived state, we use useMemo)
  // const even = useMemo(()=>{
  //   const even = count % 2;
  //   return even
  // },  [count])

  // approach 3 (great approach in recoil) (using selector in recoil)
  /* 
  A selector represents a piece of derived state. You can think of derived state as the output of passing state to a pure function that derives a new value from the said state.
  */

  const even = useRecoilValue(evenSelector);

  return <div>
    {/* {even == 0 ? "It is even" : null} */}
    {even == 0 ? "It is even" : null}
  </div>
}

export default App
