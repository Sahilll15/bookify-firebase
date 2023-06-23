import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';

const BookCard = (props) => {
    const navigate=useNavigate();
    const Firebase=useFirebase();

    const [url,setUrl]=useState(null);

    useEffect(()=>{
        Firebase.getImageUrl(props.imageUrl).then(url=>setUrl(url));
    })

  return (
   <>
   <Card style={{ width: '15rem',margin:"20px" }}  >
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This is Book title <strong>{props.name} </strong>and this is book is sold by {props.displayName} and this book costs  {props.price}Rs
      
        </Card.Text>
        <Button variant="primary" onClick={e=>navigate(`/book/view/${props.id}`)}>Get Details</Button>
      </Card.Body>
    </Card>


   </>
  )
}

export default BookCard;