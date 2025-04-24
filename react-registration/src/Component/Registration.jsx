import React from 'react'
import "./component.css"

const Registration = () => {
    const sendData = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.pass.value;

        console.log(name, email, password);

        try {
            const response = await fetch('https://csea-student-app.onrender.com/register', {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json();
            alert(res.msg);
            console.log("Server Response:", res);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <div className='head'>
            <h1>Registration Form</h1>
            <form action="" onSubmit={sendData} className='form'>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' required placeholder='Name' id='name' className='input'/>
                </div>

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

export default Registration