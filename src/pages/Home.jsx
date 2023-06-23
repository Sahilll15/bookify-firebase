import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import BookCard from '../components/Card';


const Home = () => {

    const Firebase=useFirebase();

    const [books,setBooks]=useState([]);


    useEffect(()=>{
        Firebase.listAllBooks()
        .then((docs)=>{
            console.log(docs.docs[1].data())
            setBooks([...docs.docs]) 
        }  
        )
    },[])
  return (
    <div className='container my-5' style={{display:'flex',flexDirection:'wrap'}}>
    
       {books.map((book)=>{
        return (<BookCard key={book.id} id={book.id} {...book.data()}/>)
       })}
    </div>
  )
}

export default Home;