import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFirebase } from '../context/Firebase';


const List = () => {
    const[data,setdata]=useState({name:'',isbnNumber:'',price:''})
    const [coverPick,setcoverPick]=useState('');

    const Firebase=useFirebase();
    const onChange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
        
    }

    const handldeSubmit= async (e)=>{
        e.preventDefault();
        await Firebase.handleCreateNewListing(data.name,data.isbnNumber,data.price,coverPick);
        
    }

  return (
    
    <div className='container my-5'>
               <h1 className='container' style={{textAlign:"center"}} >Add Book</h1>
         <Form onSubmit={handldeSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter Book name" name='name' onChange={onChange}/>
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>ISBN</Form.Label>
        <Form.Control type="text" placeholder="Enter isbnNumber" name='isbnNumber' onChange={onChange}/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Price:</Form.Label>
        <Form.Control type="text" placeholder="Enter Price.." name='price' onChange={onChange}/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Add Image</Form.Label>
        <Form.Control type="file" placeholder="Add the Image.." name='coverPick' onChange={(e)=>setcoverPick(e.target.files[0])}/>
       
      </Form.Group>


      
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <ToastContainer />
      
    </div>
  )
}

export default List