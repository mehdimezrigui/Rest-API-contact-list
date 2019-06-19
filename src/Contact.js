import React from 'react'
import {Link } from "react-router-dom";
export default function Contact({info, getId, del}) {
    return (
       
        <div className="list">
            <div className="line">Name: <h6>{info.name}</h6></div>
            <div className="line">Phone:<h6>{info.phone}</h6></div>
            <div className="line">E-mail:<h6>{info.mail}</h6></div>
            <div><Link to={`/modify_contact`} onClick={()=>getId(info._id, false)}><button>Update</button></Link><button onClick={()=>{del(info._id); window.location.replace("http://localhost:3000/contact/")}}>Delete</button></div>
        </div>
        
    )
}
