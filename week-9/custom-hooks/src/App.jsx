import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

// custom hook for data fetching
// function useTodos(n) {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const oldInterval= setInterval(() => {
//       axios.get('https://sum-server.100xdevs.com/todos').then(response => {
//         setTodos(response?.data?.todos);
//         setLoading(false);
//       })
//     }, n * 1000);

//     return ()=>{
//       clearInterval(oldInterval);
//     }
//   }, [n])
//   return { todos, loading };
// }

// function useOnline() {
//   // return window.navigator.onLine;
//   const [isOnline, setIsOnline] = useState(window.navigator.onLine);
//   useEffect(()=>{
//     window.addEventListener('online', ()=> setIsOnline(true));
//     window.addEventListener('offline', ()=> setIsOnline(false));
//   }, []);

//   return isOnline;
// }

// function useMousePointer(){
//   const [position, setPosition] = useState({x: 0, y: 0});
//   function handleMouseMove(e){
//     setPosition({x: e.clientX, y: e.clientY });
//   }
//   useEffect(()=>{
//     window.addEventListener('mousemove', handleMouseMove);
//     return ()=>{
//       window.removeEventListener('mousemove', handleMouseMove);
//     }
//   }, []);

//   return position;
// }

// function useInterval(){
//   const [count, setCount] = useState(0);
//   setInterval(()=>{
//     setCount(c => c + 1);
//   }, 1000);  

//   return count;
// }

function useDebounce(inputValue, delay){

  useEffect(()=>{
    // start new timer
    const timer = setTimeout(()=>{
      axios.get(`https://demo.dataverse.org/api/search?q=${inputValue}`).then(response=>{
        console.log(response?.data);
      })
    }, delay)

    // remove/clear old timer
    return ()=>{
      clearTimeout(timer);
    }
  }, [inputValue, delay]);
}

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500); // 500 milliseconds debounce delay

  // Use the debouncedValue in your component logic, e.g., trigger a search API call via a useEffect

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search..."
    />
  );
};

function App() {

  // const { todos, loading } = useTodos(5);
  // const isOnline = useOnline();
  // const position = useMousePointer();
  // const count = useInterval();

  return (
    <>
      {/* {loading ? "Loading..." : todos?.map((todo, index) => <TodoRender key={index} todo={todo} />)} */}
      {/* {isOnline ? <div>Your are online</div> : <div>Your are offline</div>} */}
      {/* <div>My mouse position: {position.x} {position.y} </div> */}
       {/* <div>Timer: {count}</div> */}
       <SearchBar />
    </>
  )
}

// function TodoRender({ todo }) {
//   return (
//     <div>
//       <h1>{todo?.title}</h1>
//       <h2>{todo?.description}</h2>
//     </div>
//   )
// }

export default App
