import React, { useState } from 'react'
import "./component.css"
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.pass.value;
        const response = await fetch('https://csea-student-app.onrender.com/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        const res = await response.json();
        alert(res.msg);
        if(res.msg=="Login Success"){
            navigate("/dashboard")
        }
        console.log("Server Response:", res);
    }

    return (

        <div className='head'>
            <h1>Login Form</h1>
            <form action="" onSubmit={sendData} className='form'>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required placeholder='Email' id='email' className='input'/>
                </div>

                <div>
                    <label htmlFor="pass">Password</label>
                    <input type="password" name='pass' required placeholder='Password' id='pass' className='input'/>
                </div>

                <button type='submit' className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default Login;