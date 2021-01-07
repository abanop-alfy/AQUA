import React from "react";
import ContactMailIcon from '@material-ui/icons/ContactMail';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer" >
        <>
          <Link
            to="/contact-us"
            title={`you can go to all courses information from here `}
            style={{ color: "white" ,marginRight:"40px",fontSize:"20px", textDecoration: "none"}}
          >
        
           <span style={{marginRight:"5px",fontSize:"30px"}}> Contact Us</span>  
            <ContactMailIcon  style={{fontSize:"30px" ,marginBottom:"-5px"}} />
          </Link>
          <Link
            to="/About-us"
            title={`you can go to all courses information from here `}
            style={{ color: "white", textDecoration: "none" }}
          >
            
            <span style={{marginRight:"5px",fontSize:"30px"}}>About us!</span> 
            <InfoIcon style={{fontSize:"30px" ,marginBottom:"-5px"}}/>
          </Link>
          </>
      
    </div>
  );
}
