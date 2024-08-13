import { memo, useCallback, useState } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
    const [count, setCount] = useState(0);
    const [counter, setCounter] = useState(0);

    // Your code starts here
    const handleIncrement = useCallback(() => {
        console.log("Recreated handleIncrement");
        setCount(function(currentCount) {
            return currentCount + 1;
        })
    }, [counter])

    const handleDecrement = useCallback(() => {
        console.log("Recreated handleDecrement");
        setCount(count => {
            return count - 1
        });
    }, [counter]);
    
    // Your code ends here

    return (
        <div>
            <p>Count: {count}</p>
            <CounterButtons onIncrement={handleIncrement} onDecrement={handleDecrement} />
            <button onClick={()=>setCounter(counter + 1)}>Count {counter}</button>
        </div>
    );
};

const CounterButtons = memo(({ onIncrement, onDecrement }) => (
    <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
    </div>
));
