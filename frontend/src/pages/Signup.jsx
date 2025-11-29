import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError } from '../Utils'

const Signup = () => {

    const [signupInfo, setsignup] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name,value);
        const copysignupInfo = { ...signupInfo };
        copysignupInfo[name] = value;
        setsignup(copysignupInfo);
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("Form submitted", signupInfo);
        const { name, email, password } = signupInfo;
        if(!name || !email || !password)  return handleError("All fields are required");


        try{
            const url ="http://localhost:8080/auth/signup";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(signupInfo)
            });
            const result= await response.json();
            console.log(result);
        }catch{}
        setsignup({
            name: "",
            email: "",
            password: ""
        }); 
    }
    // console.log(signupInfo);
    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup} method='POST'>
                <div>
                    <label htmlFor="name">name:</label>
                    <input onChange={handleChange} type="text" id="name" name="name" placeholder='Enter name' value={signupInfo.name} autoFocus />

                    <label htmlFor="email">Email:</label>
                    <input onChange={handleChange} type="email" id="email" name="email" placeholder='Enter email' value={signupInfo.email} autoFocus />

                    <label htmlFor="password">Password:</label>
                    <input onChange={handleChange} type="password" id="password" name="password" placeholder='Enter password' value={signupInfo.password} autoFocus />

                    <button type="submit">Signup</button>

                    <span>Already have an account?
                        <Link to="/login"> Login here</Link>
                    </span>
                </div>
            </form>
            <ToastContainer />

        </div>
    )
}

export default Signup