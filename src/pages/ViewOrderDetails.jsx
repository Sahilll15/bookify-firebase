import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';

const ViewOrderDetails = () => {
    const params=useParams();
    const FireBase=useFirebase();
    const  [orders,setorders]=useState([]);

    useEffect(() => {
        FireBase.BookOrders(params.bookId).then(orders => setorders(orders.docs));
      }, []);
      
   

  return (
    <>
    
   { orders && orders.length > 0 ? (
    <div className='container'><h1 style={{textAlign:'center'}}>Orders</h1>
    {
        orders.map((order)=>{
            const data=order.data();
            return <div key={order.id} className='mt-5' style={{border:'10px solid black',padding:'20px'}}>
                <h5>Order by: {data.userEmail}</h5>
                <h5>Order by: {data.qty}</h5>

            </div>


        })
    }
    
    </div>):( <div><h3 style={{textAlign:"center",margin:"100px auto"}}>No Orders for this Book</h3></div> )}
    </>
  )
}

export default ViewOrderDetails