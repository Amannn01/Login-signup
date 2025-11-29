import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../Utils'

const Login = () => {

    const [loginInfo, setlogin] = useState({
      email:"",
      password:""
    })
    const handleChange=(e)=>{
      const {name ,value}=e.target;
      const copyloginInfo ={...loginInfo};
      copyloginInfo[name]=value;
      setlogin(copyloginInfo);
    }
    const navigate = useNavigate();
    const handlelogin=async(e)=>{
      e.preventDefault();
      const{email,password}=loginInfo;
      if(!email || !password) return handleError("all field are required");

      try{
          const url ="http://localhost:8080/auth/login";
          const response =await fetch(url,{
            method:'POST',
            headers:{
              "content-Type":"application/json"
            },
            body:JSON.stringify(loginInfo)
          });
          const result = await response.json();
          const {success , message, jwtToken,name, error}= result;
          if(success){
            handleSuccess(message);
            localStorage.setItem('token',jwtToken);
            localStorage.setItem('logged in user',name)

            setTimeout(()=>{
              navigate('/home');
            },1000)
          }else if(error){
            const details = error?.details[0].message;
            handleError(details)
          }else if(!success){
            handleError(error)
          }
      }catch(error){ 
        handleError(error);       

      }

    }

    // console.log(signupInfo);
    return (
        <div className='container'>
            <h1>login</h1>
            <form onSubmit={handlelogin} method='POST'>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input onChange={handleChange} type="email" id="email" name="email" placeholder='Enter email' value={loginInfo.email} autoFocus />

                    <label htmlFor="password">Password:</label>
                    <input onChange={handleChange} type="password" id="password" name="password" placeholder='Enter password' value={loginInfo.password} autoFocus />

                    <button type="submit">login</button>

                    <span> New Account open ?
                        <Link to="/signup"> signup here</Link>
                    </span>
                </div>
            </form>
            <ToastContainer />

        </div>
    )
}

export default Login