import React, {useState} from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import EmailIcon from "@material-ui/icons/Email";
import TwitterIcon from "@material-ui/icons/Twitter";
import TelegramIcon from "@material-ui/icons/Telegram";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Auth } from 'aws-amplify';
import axios from "axios";

const NewFooter = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [message, setMessage] = useState("");

    const messageChange = (e) => {
        console.log(e.target.value);
        setMessage(e.target.value);
        e.preventDefault();
      };
    
      const activateForm = (e) => {
        axios
          .post(
            "https://formcarry.com/s/GVcGpJFGuxxo",
            {
              name: "User",
              email: "Email",
              message: message,
            },
            { headers: { Accept: "application/json" } }
          )
          .then(function(response) {
            console.log(response);
            setMessage("")
            alert("Thanks for your feedback!");
          })
          .catch(function(error) {
            console.log(error);
          });
    
        e.preventDefault();
      };

  return (
    <FooterContainer className="main-footer">
        <div style={{padding:"0 2%"}}> 
          <div className="footer-bottom">
            <div class="row" style={{color:"#D4DBDB"}}>

            <Col> <p style={{float:"left", fontSize:"11px", cursor:"pointer"}} onClick={handleShow}> Feedback  </p> <p style={{float:"left", fontSize:"11px", marginLeft:"10px", cursor:"pointer"}} onClick={()=>{
                    Auth.signOut();
                    window.location.reload(false);
                  }}> Sign Out </p> </Col>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title><p style={{fontSize:"18px"}}>Feedback</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p style={{fontSize:"14px"}}> 
        Thank you for taking the time to provide feedback.
        </p>

        <Form.Group controlId="exampleForm.ControlTextarea1" style={{fontSize:"12px"}}>
    <Form.Label> Enter your message below. </Form.Label>
    <Form.Control as="textarea" rows={2} onChange={messageChange} style={{fontSize:"12px"}}/>
  </Form.Group>
  <p style={{fontSize:"12px", color:"#545A64"}}>Are you satisfied with your experience? 


  <br></br>

  <Form.Check inline label="Yes" name="group2" type={"radio"} id={`inline-radio-1`} style={{paddingLeft:'1%', paddingTop:"1%"}} /> 
  <br></br>
  <Form.Check inline label="No" name="group2" type={"radio"} id={`inline-radio-2`} style={{paddingLeft:'1%'}} />
  </p>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{backgroundColor:"white", borderColor:'white',color:"black",fontSize:"12px"}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={activateForm} style={{backgroundColor:"#EC7210", borderColor:'#EC7210', fontSize:"12px", borderRadius:"0px"}}>
            Submit Feedback
          </Button>
        </Modal.Footer>
      </Modal>

            <Col> <p style={{float:"right", fontSize:"11px"}}> &copy; {new Date().getFullYear()} Amazon Web Services, Inc. or its affiliates. All rights reserved. </p></Col>
            </div>
          </div>
      </div>
     
    </FooterContainer>
  );
};

export default NewFooter; 

const FooterContainer = styled.footer`

.container{
    font-family: Roboto, "Helvetica Neue Light", Helvetica, sans-serif;
    display: flex;
    flex-direction:column;
    position: relative;
    bottom: 0%;
}
.footer-middle{
    padding-top:0rem;
    flex:1
}
.footer-bottom{
    padding-top:1rem;
    position: relative;
    bottom: 0;
    width: 100%;
    padding-bottom:0rem;
}
ul li a {
    color:var(--mainwhite);
}
ul lia a:hover{
    color:var(--mainlightGrey);
}
a { color: inherit; } 

.footer-headers{
    font-weight:bold;
    color: var(--orange-color);
}
`;