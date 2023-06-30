"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const notify = () => toast("Wow so easy!");

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("userName", username)

        if (username === '' || email === '' || password === '') {
            notify.error("fill all fields")
            return
        }
        if (password.length < 6) {
            notify.error('Password must be at least 6 characters')
            return
        }
        try {
            const res = await fetch('/api/register', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ username, email, password })

            }).then((res) => res.json());
            console.log("abc", res)
            if (res.ok) {
                notify.success("Successfull registered the user")
                // setTimeout(() => {
                //     // signIn()

                // }, 1500)
                return
            } else {
                notify.error("Error occurd while registering")
                return
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
    return (
        <div>
            <ToastContainer />
            register
            <form onSubmit={handleSubmit}>
                <div className='flex '>
                    <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='your Email'>
                    </input>
                </div>
                <div className='flex flex-col mb-6'>
                    <input onChange={(e) => setUsername(e.target.value)} type='text' placeholder='your UserName'>
                    </input>
                </div>
                <div className='flex flex-col mb-6'>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='your Password'>
                    </input>
                </div>
                <button type='submit'>Submit</button>

            </form>
            <div>
                <span>
                    Already have account ?
                </span>
            </div> 
        </div>
    )
}

export default register