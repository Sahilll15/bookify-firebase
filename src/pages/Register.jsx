import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



const Register = () => {
    const navigate=useNavigate();
    const [showpassword,setshowpassword]=useState(false);

    const[data,setdata]=useState({email:'',password:''})

    const Firebase=useFirebase();
   

    useEffect(()=>{
        if(Firebase.isLoggedin){
            navigate('/')
        }
    },[Firebase,navigate])


    
    const onChange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }

    const handldeSubmit= async (e)=>{
        
        e.preventDefault();
        await Firebase.signupUserWithEmailandPassword(data.email,data.password);
        

    }

    const handlepass=()=>{
        setshowpassword(!showpassword);
    }
  


  return (

    <div className='container my-5'>
               <h1 className='container' style={{textAlign:"center"}} >Register</h1>
         <Form onSubmit={handldeSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={onChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type={showpassword ?"text":"password"} placeholder="Password"  name='password' onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" onClick={handlepass} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <span >Already a user ? <NavLink to={'/login'} style={{textDecoration:"none"}}>Login</NavLink></span>
    <ToastContainer />
      
    </div>
  )
}

export default Register;
