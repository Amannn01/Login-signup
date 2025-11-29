import { useEffect,useState,React } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../Utils';
import {ToastContainer}from 'react-toastify'

const Home = () => {
 const  navigate = useNavigate();
  const [loggedInUser, setloggedInUser] = useState(' ');
  useEffect(()=>{
    setloggedInUser(localStorage.getItem('logged in user'))
  },[])
  const handlelogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('logged in user')
    handleSuccess("user logout")
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }
  return ( 
    <div> 
      <h1>{loggedInUser}</h1> 
      <button onClick={handlelogout}>logout</button> 
      <ToastContainer/> 
    </div>
  )
}

export default Home