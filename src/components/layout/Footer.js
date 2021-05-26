import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import EmailIcon from "@material-ui/icons/Email";
import TwitterIcon from "@material-ui/icons/Twitter";
import TelegramIcon from "@material-ui/icons/Telegram";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Auth } from 'aws-amplify';


const Footer = () => {
  return (
    <FooterContainer className="main-footer">
      <div className="footer-middle">
        <div className="container">

            <Row> 
            <Col xs={10} xl={11} ><h4>The Mentoring Circle</h4><h6 style={{"opacity":"0.7"}}>Hire and Develop the Best</h6> </Col>
                
            <Col xs={2} xl={1}> 
            </Col>
            </Row> 




            <hr />
     
          <div className="row">
       

            <div className="col-md-3 col-sm-6">
              <h4 className="footer-headers">Explore</h4>
              <ul className="list-unstyled">
                <li>
                  {" "}
                  <a href="/">Project Wiki Page</a>
                </li>
                <li>
                  {" "}
                  <a href="/">Github Repository</a>
                </li>
                <li>
                  {" "}
                  <a href="/">The Mentoring Circle Guide</a>
                </li>
                <li>
                  {" "}
                  <a href="/">Research and Innovation</a>
                </li>
                <li>
                  {" "}
                  <a href="/" onClick={()=>{
                    Auth.signOut();
                    window.location.reload(false);
                  }}>Sign Out</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6">
              <h4 className="footer-headers">Contribute</h4>
              <ul className="list-unstyled">
                <li>
                  {" "}
                  <a href="/">
                    Work with us
                  </a>
                </li>
                <li>
                  <a href="/">
                    Spread the word
                  </a>
                </li> 
              </ul>
            </div>
           

            <div className="col-md-3 col-sm-6">
              <h4 className="footer-headers">Company</h4>
              <ul className="list-unstyled">
                <li>
                  {" "}
                  <a href="/">
                    Leadership Principles at AWS
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="/">
                    Investment in Leadership
                  </a>
                </li>
              </ul>
            </div>
        

            <div className="col-md-3 col-sm-6">
    
              <ul className="list-unstyled"></ul>
            </div>
          </div>

          <div class="row">

          </div>

          {/* Footer Bottom  */}
          <div className="footer-bottom">
            <hr />
            <div class="row">
              <div class="col-12 col-md-9">
                &copy; {new Date().getFullYear()} AWS - All rights
                reserved
              </div>
          
            </div>
          </div>
        </div>
      </div>
     
    </FooterContainer>
  );
};

export default Footer; 

const FooterContainer = styled.footer`

.container{
    font-family: Roboto, "Helvetica Neue Light", Helvetica, sans-serif;
    display: flex;
    flex-direction:column;
    position: relative;
    bottom: 0%;
}
.footer-middle{
    padding-top:2rem;
    flex:1
}
.footer-bottom{
    padding-top:2rem;
    position: relative;
    bottom: 0;
    width: 100%;
    padding-bottom:2rem;
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