import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useFirebase } from '../context/Firebase'


const Details = () => {
    const [data,setData]=useState(null)
    const[url,setUrl]=useState(null);
    const Firebase=useFirebase();
    const params = useParams()
    console.log(params)
    
    console.log(data)
    console.log(data.imageUrl)

    useEffect(()=>{
        Firebase.getBookById(params.bookId).then(value=>setData(value.data()))
    },[])

    useEffect(()=>{
       if(data){
        const ImageURL=data.imageUrl;
        Firebase.getImageUrl(ImageURL).then(url=>setUrl(url));
       }

    },[])
   
   


    if (data == null)  return <h1>Loading...</h1>;

    return <div className='container'>
        <h1 style={{marginLeft:'50px'}}>{data.name}</h1>
        <img src={url} alt="" style={{margin:'0 50px 50px 50px',borderRadius:'10px',height:'50vh'}} />
        <h2>Details:</h2>
        <h3>ISBN: {data.isbn}</h3>
        <h3>Price: {data.price} Rs</h3>
        <h3>Owner: {data.userEmail}</h3>
        <button className='btn btn-success'>Buy Now</button>
    </div>
  
}

export default Details