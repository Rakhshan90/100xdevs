import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: 'black', padding: "10px" }}>
            <button onClick={()=> navigate('/')}>
                Home
            </button>
            <button onClick={()=> navigate('/dashboard')}>
                Dashboard
            </button>
        </div>
    )
}

export default Navbar