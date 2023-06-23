import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './googlebutton.css'
import logo from './logo.png'
import { useNavigate } from 'react-router-dom';




const Login = () => {
    const navigate=useNavigate();

    

    const [showPassword, setShowPassword] = useState(false);


    const[data,setdata]=useState({email:'',password:''})

    const Firebase=useFirebase();
    console.log(Firebase)
   
    
    const onChange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }

    const handldeSubmit= async (e)=>{
        
        e.preventDefault();
        await Firebase.loginwithPasswordAndUsername(data.email,data.password);
        

    }

    const handlepass=()=>{
        setShowPassword(!showPassword);
        
    }

    useEffect(()=>{
        if(Firebase.isLoggedin){
            navigate('/')
        }
    },[Firebase,navigate])


    const handleGoogleSignIn=()=>{
        Firebase.singInWithGoogle()
        .then((result)=>{
            console.log(result);
            toast.success('User Login Successfully')
        })
        .catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.message;
            console.log(errorCode,errorMessage);
            toast.error(errorMessage)


        })
    }


  return (

    <div className='container my-5'>
        <h1 className='container' style={{textAlign:"center"}} >Login</h1>
         <Form onSubmit={handldeSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={onChange}/>
     
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
  type={showPassword ? "text" : "password"}
  placeholder="Password"
  name="password"
  onChange={onChange}
/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" onClick={handlepass} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
     
    </Form>

    <button id="google-signin-button" onClick={handleGoogleSignIn}>
  <img src={logo} alt="Google Icon" />
  <span>Sign in with Google</span>
</button>

    

    <ToastContainer />
      
    </div>

    
  )
}

export default Login;

