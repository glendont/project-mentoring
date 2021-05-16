import React from "react"
import { Link, useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import logosmile from "../img/logo_smile.png"
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const NavigationBar = () => {
return (

<div className="navbar">
    <Row >
    <Link to="/home" className="logo">
        <Col className="logo"> 
        <p> The Mentoring</p>
        <p  style={{marginTop:"-22px",marginLeft:"76px"}}> Circle</p>
        <img src={logosmile} height="40px" width="170px" style={{margin:"-30px", marginLeft:"-40px", marginTop:"-80px"}}/> 
        </Col>    

    </Link>{" "}

    </Row>

    <div style={{float:"right",marginBottom:"2%", marginRight:"1%"}}>
    <Link className="about_button" to="/about">
<h5 className="about_button"> About </h5>
    </Link>{" "}
    </div>

</div>
    )
}
export default NavigationBar; 