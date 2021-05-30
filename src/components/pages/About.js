import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Background from "../img/hive_background.png"
import ArchitectureDiagram from "../img/mentoring_ad.png"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Scroll from 'react-scroll'
import { Element } from 'react-scroll'

import {Link} from "react-scroll"

const ScrollLink = Scroll.ScrollLink

const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
  });
  
  function createData(name, calories) {
    return { name, calories };
  }
  

const About = () => {
    const classes = useStyles();

    
    return (
        <div style={{height:"2500px"}}> 
    
        <Row style={{ backgroundImage:`url(${Background})`,width:"100vw",backgroundSize:"100% 100%", height:"200px", margin:"0px"}}>

        <Col md={2} > </Col> 
        <Col md={5}>
            <p style={{fontSize:'40px', marginTop:"6%", fontFamily:"Amazon Ember"}}><b> The Career Progress Board Tool FAQs </b></p>
        </Col> 
        <Col md={5} > </Col> 
        </Row>


        <Row  style={{backgroundColor:"white", height:"25vh",marginTop:"3%", marginLeft:"0px", marginRight:"0px"}}>
        <Col md={4} style={{fontFamily:"Amazon Ember"}}> 
        <Row> <p style={{paddingLeft:"50%", color:"#535C64", fontSize:"13px"}}><b> PAGE CONTENT </b> </p> </Row>

        <Row><Link to="overview" smooth={true} duration={1000} style={{all:"none%", paddingLeft:"50%"}}><p> <b> Overview </b></p>  </Link></Row>
        <Row><Link to="architecture" smooth={true} duration={1000} style={{all:"none%", paddingLeft:"50%"}}><p> <b> Architecture </b></p>  </Link></Row>
        <Row><Link to="security" smooth={true} duration={1000} style={{all:"none%", paddingLeft:"50%"}}><p> <b> Security </b></p>  </Link></Row>
        <Row><Link to="contact" smooth={true} duration={1000} style={{all:"none%", paddingLeft:"50%"}}><p> <b> Contact </b></p>  </Link></Row>
        </Col> 
        
        <Col md={6} style={{backgroundColor:"white", width:"50vw", marginLeft:"-30px"}}>
        <Row> <h2 style={{fontFamily:"Amazon Ember", marginBottom:"20px"}}>General</h2> </Row>
        <Row id="overview"> <b> <p style={{fontSize:"20px", marginTop:"20%"}}>Overview</p> </b></Row>

        <Row>  <p style={{font:"Amazon Ember"}}> <b> Q: What is the Career Progress Board Matching Tool? </b></p>  </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> The Career Progress Board Matching Tool is an internal tool built to automate the process of matching mentors and mentees based on a set of predetermined matching conditions in order to achieve respective operational outcomes. </p></Row>
        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: How does the tool work? </p> </b> </Row>

        <Row> <p style={{fontFamily:"Amazon Ember"}}> Step 1: Through the landing page of the web application, click "Add Data" to upload your data file in the format denoted in section "Data Format and Requirements".</p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> Step 2: On the checklist, indicate the compulsory conditions that have to be met during the matching process. Conditions that are not checked will be fulfiled on a best-effort basis. </p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> Step 3: Click "Match".</p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> Step 4: The matching algorithm will be triggered automatically.</p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> Step 5: When ready, a "Download" button would appear. Click on the button to download your results.</p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> Step 6: The results will be downloaded to your local machine.</p></Row>
        
        
        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: How does the matching algorithm work?</p> </b> </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> The Career Progress Board Tool uses a matching algorithm based on your established matching requirements and generates a set of mentors-mentee in the form of an excel file.</p></Row>
       
        
        <Row id="architecture"> <b> <p style={{fontSize:"20px", marginTop:"20%"}}>Data Format and Requirements</p> </b></Row>
        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: What is the required format for the input data? </p> </b> </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> The tool requires the user to input an Excel spreadsheet with the file extension of .xlsx. Within the Excel spreadsheet, there should be 2 separate sheets - 1) Mentor and 2) Mentee that contains the neccessary information of the candidates to perform the matching. A template for the input data can be downloaded <a href="https://mentor-mentee-matching-bucket190958-dev.s3.amazonaws.com/public/assets/Template.xlsx"> here</a>.  </p></Row>

        <Row id="architecture"> <b> <p style={{fontSize:"20px", marginTop:"20%"}}>Architecture</p> </b></Row>
        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: What is the Architecture Diagram of The Career Progress Board Matching? </p> </b> </Row>
        <Row> <img src={ArchitectureDiagram} height="420px"/> </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> The tool utilises the following AWS Services: AWS Amplify, S3, Cognito and Lambda. </p></Row>
       

        <Row className="security_class" id="security"> <b> <p style={{fontSize:"20px", marginTop:"20%"}}>Security</p> </b></Row>
        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: Who can access the web application? </p> </b> </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> User authentication and access authorisation is integrated to the web application through AWS Cognito. This ensures that only authenticated users with the approved authorisation can access the web application.</p></Row>

        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: What happens to documents uploaded to the tool? </p> </b> </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> In order to maintain the security and confidentality of the documents uploaded, the following mechanisms ensures that documents do not stay on the platform for a prolonged period of time: </p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> 1. Upon completed processing of the uploaded document, a lambda function is triggered to remove the original document from the S3 Bucket. </p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> 2. In edge cases where documents are unable to complete processing due to an error, those documents are scheduled to be removed from the S3 Bucket through a <a href="https://www.google.com/search?q=eventsbridge+scheduuled+job&rlz=1C5CHFA_enSG914SG914&oq=eventsbridge+scheduuled+job&aqs=chrome..69i57.5622j0j7&sourceid=chrome&ie=UTF-8"> scheduled EventsBridge Rule. </a>  </p></Row>

        <Row className="contact_class" id="contact"> <b> <p style={{fontSize:"20px", marginTop:"20%"}}>Contact</p> </b></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}>The tool is built by <a style={{color:"black"}} href="https://www.linkedin.com/in/glendonthaiw/">Glendon Thaiw</a> - If you'd require any additional guidance or troubleshooting support, please reach out at thaiwg@amazon.com.  </p></Row>

        </Col> 
       <Col md={2}> </Col>
        </Row>
        </div> 
    )
}

export default About; 










