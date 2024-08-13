import React, { useState, useCallback } from 'react';
import { useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [counter, setCounter] = useState(0);
    const renderCount = useRef(0);

    const handleReRender = () => {
        // Update state to force re-render
        setCounter(counter + 1);
    };

    renderCount.current = renderCount.current + 1;

    return (
        <div>
            <p>This component has rendered {renderCount.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};