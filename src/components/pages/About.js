import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Background from "../img/hive_background.png"
import ArchitectureDiagram from "../img/icat_ad.png"
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
  
  const rows = [
    createData('master', "primary, main, leader"),
    createData('abort', "stop"),
    createData('hang', "stop responding"),
    createData('execute', "start, run"),
    createData('blacklist', "deny list"),
    createData('whitelist', "allow list"),
    createData('slave', "replica, secondary, standby"),
  ];


const About = () => {
    const classes = useStyles();

    
    return (
        <div style={{height:"3000px"}}> 
    
        <Row style={{ backgroundImage:`url(${Background})`,width:"100vw",backgroundSize:"100% 100%", height:"180px", margin:"0px"}}>

        <Col md={2} > </Col> 
        <Col md={5}>
            <p style={{fontSize:'40px', marginTop:"7%", fontFamily:"Amazon Ember"}}><b> Inclusive Content Audit Tool FAQs </b></p>
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
        <Row id="overview"> <b> <p style={{fontSize:"20px"}}>Overview</p> </b></Row>

        <Row>  <p style={{font:"Amazon Ember"}}> <b> Q: What is the Inclusive Content Audit Tool (ICAT)? </b></p>  </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> ICAT helps to promote inclusive content in both internal and client-facing documentations by providing a fuss-free mechanism to scan through your documents uploaded to S3. A findings report is appended to the end of the document which highlights the words flagged, the number of words flagged, as well as proposed alternatives for the flagged words. </p></Row>
        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: How does ICAT work? </p> </b> </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> ICAT uses AWS textract to scan through your documents uploaded to S3 and highlights potentially offensive words for your reconsideration. A findings report is also generated and appended to the end of your document. </p></Row>
        
        
        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: How does the annotation algorithm work?</p> </b> </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> The text annotation algorithm used in ICAT flags text based off a pre-defined set of potentially offensive words according to the official <a href="https://alpha-docs-aws.amazon.com/awsstyleguide/latest/styleguide/inclusive.html"> AWS Style Guide</a>. The set of potentially offensive words are as follows: </p></Row>
        
        <Row style={{marginTop:"20px",marginBottom:"60px"}} > 

        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Flagged Words</b></TableCell>
            <TableCell align="center"><b>Recommendations</b></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Row> 
        

        <Row id="architecture"> <b> <p style={{fontSize:"20px"}}>Architecture</p> </b></Row>
        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: What is the Architecture Diagram of ICAT? </p> </b> </Row>
        <Row> <img src={ArchitectureDiagram} height="390px"/> </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> ICAT utilises the following AWS Services: AWS S3, Lambda, Textract and Simple Notification System (SNS). </p></Row>
        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: How does ICAT work in the backend? </p> </b> </Row>

        <Row> <p style={{fontFamily:"Amazon Ember"}}>
            1. When a user uploads a document through the ICAT web application, the web application uploads it to a designated S3 bucket. </p></Row>

        <Row> <p style={{fontFamily:"Amazon Ember"}}>2a. If the uploaded object is a word document (.docx file format), a lambda function is triggered upon object upload, and performs the annotation algorithm on the document. </p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}>2b-1. if the uploaded object is a PDF document (.pdf file format), the lambda function triggers AWS Textract to perform text extraction on the PDF document. </p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}>2b-2. Upon completion of text extraction, another lambda function is triggered through Simple Notification System (SNS) to compile the extracted text into a word document (.docx file format).  </p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}>2d-3. This newly processed word document will be uploaded into the original S3 bucket, which triggers steps 1 and 2a for the annotation algorithm to be performed on the word document. </p></Row>
        
        <Row> <p style={{fontFamily:"Amazon Ember"}}>3. Upon completion of the annotation algorithm, the processed document is uploaded to another S3 bucket.</p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}>4. The web application will download the processed document from the S3 bucket to the browser, where the document will be downloaded by the user.</p></Row>





        <Row className="security_class" id="security"> <b> <p style={{fontSize:"20px"}}>Security</p> </b></Row>
        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: What happens to documents uploaded to ICAT? </p> </b> </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> In order to maintain the security and confidentality of the documents uploaded to ICAT, the following mechanisms ensures that documents do not stay on the platform for a prolonged period of time: </p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> 1. Upon completed processing of the uploaded document, a lambda function is triggered to remove the original document from the S3 Bucket. </p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> 2. In edge cases where documents are unable to complete processing due to an error, those documents are scheduled to be removed from the S3 Bucket through a <a href="https://www.google.com/search?q=eventsbridge+scheduuled+job&rlz=1C5CHFA_enSG914SG914&oq=eventsbridge+scheduuled+job&aqs=chrome..69i57.5622j0j7&sourceid=chrome&ie=UTF-8"> scheduled EventsBridge Rule. </a>  </p></Row>

        <Row id="contact"> <b> <p style={{fontSize:"20px"}}>Contact</p> </b></Row>
        <Row> <b> <p style={{font:"Amazon Ember Bold"}}> Q: What are the future plans for the project and how can I contribute? </p> </b> </Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> There are many ideas for improving and extending this project; Below is a short, but incomplete list. Feel free to <a href="https://phonetool.amazon.com/users/thaiwg"> reach out to us </a> if you would like to contribute! </p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> • Add support for additional file formats such as .pptx and .xslx </p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> • Add support for text detection and extraction from images </p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> • Allows user to customize words to flag to tailor to specific use-case</p></Row>
        <Row> <p style={{fontFamily:"Amazon Ember"}}> • Build a GreaseMonkey/Tampermoney script for real-time identification when users are writing from a web browser</p></Row>

        </Col> 
       <Col md={2}> </Col>
        </Row>
        </div> 


    )
}

export default About; 










