import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useFirebase } from '../context/Firebase'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Details = () => {
    const [data,setData]=useState(null)
    const[url,setUrl]=useState(null);
    const [quantity,setquantity]=useState(1)
    const Firebase=useFirebase();
    const params = useParams()
    console.log(params)
    

  

    useEffect(()=>{
        Firebase.getBookById(params.bookId).then(value=>setData(value.data()))
    },[])

    useEffect(()=>{
       if(data){
        console.log(data)
        const ImageURL=data.imageUrl;
        console.log(ImageURL)
        Firebase.getImageUrl(ImageURL).then(url=>setUrl(url));
       }

    },[])
    
    const placeolder= async()=>{
        if(quantity>=1){
            await Firebase.placeOrder(params.bookId,quantity,data.name);
        }else{
            toast.error("quanity must be atleast one")
        }
        
    }
   
   


    if (data == null)  return <h1>Loading...</h1>;

    return <div className='container'>
        <h1 style={{marginLeft:'50px'}}>{data.name}</h1>
        <img src={url} alt="" style={{margin:'0 50px 50px 50px',borderRadius:'10px',height:'50vh'}} />
        <h2>Details:</h2>
        <h3>ISBN: {data.isbn}</h3>
        <h3>Price: {data.price} Rs</h3>
        <h3>Owner: {data.userEmail}</h3>
        <h2> Order :</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>No of Books</Form.Label>
        <Form.Control type="number" placeholder="Quantity" value={quantity} name='quantity' onChange={(e)=>setquantity(e.target.value)} style={{width:'200px'}}/>
      
      </Form.Group>
        <button className='btn btn-success ' style={{marginBottom:'20px'}} onClick={placeolder}>Buy Now</button>

        <ToastContainer />
    </div>
  
}

export default Details