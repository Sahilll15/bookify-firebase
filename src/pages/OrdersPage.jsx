import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import BookCard from '../components/Card';

const OrdersPage = () => {
    const [books,setBooks]=useState([]);

    const Firebase=useFirebase();

    useEffect(()=>{
        if(Firebase.isLoggedin)
          Firebase.getOrders(Firebase.user.uid).then((books)=>setBooks(books.docs));



    },[Firebase])

    if(!Firebase.isLoggedin) return <h1>Please Login</h1>


  return (
    <div className='container' style={{display:'flex',margin:'30px'}}> 

        <h2 style={{textAlign:"center"}}> Orders Console:</h2>
        {
        
        books?.map((book)=>(
        <BookCard  btn={'Order Details'}   link={`/books/orders/${book.id}`} key={book._id} id={book.id} {...book.data()}
        />))
      }</div>
  )
}

export default OrdersPage;