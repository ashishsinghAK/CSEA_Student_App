import React from 'react'
import "./component.css"
import { useNavigate, Outlet } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div style={{ color: 'white' }} className='home'>
            <h1 className='homeMain'>Welcome to Home</h1>
            <div>
                <button onClick={() => navigate("/login")} className='btn'>Login</button>
                <button onClick={() => navigate("/register")} className='btn'>Register</button>
            </div>
            {/* Outlet for nested routes */}
            <Outlet />
        </div>
    )
}

export default Home
