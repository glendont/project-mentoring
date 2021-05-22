import React, {useCallback, useState, useEffect, Fragment} from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import {IoMdPhotos} from 'react-icons/io'
import {useDropzone} from 'react-dropzone'
import {Storage} from "aws-amplify"
import {AiOutlineFileWord} from "react-icons/ai"
import {ImCross} from "react-icons/im"
import {GrShare} from "react-icons/gr"
import {RiShareBoxLine} from "react-icons/ri"
import Spinner from "react-bootstrap/Spinner"
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';

// import RequirementChecklist from "./RequirementChecklist"

import { makeStyles,withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const CardComponent = () => {
    const [isLoading, setisLoading] = useState(false)
    const [downloadReady, setdownloadReady] = useState(false)
    const [fileUploaded, setfileUploaded] = useState(false)
    const [fileLocalStorage, setfileLocalStorage] = useState(false)
    const [invalidFiletype, setinvalidFiletype] = useState(false)
    const [profileState, setprofileState] = useState({
        fileUrl:'init',
        file:'init',
        filename:'init',
        filesize:'init',
      })
    const [reqArray,setReqArray]=useState([0,1,2,3,4,5])
    const [checked, setChecked] = useState([0,1,2,3]);
    const [error, setError]=useState(false)

    const RequirementChecklist = () => {
    const useStyles = makeStyles((theme) => ({
    root: {
    width: '100%',
    maxWidth: 900,
    color:"white",
    backgroundColor:"#4E6573",
    },
}));

const CustomCheckBox = withStyles({
  root: {
    color: "#DCEEF8",
    '&$checked': {
      color: "#F4F5F6",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

    const classes = useStyles();
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    if (fileLocalStorage===false){
      return(
        <>
        </> 
      )
    } else {
      return ( 
      // <div style={{backgroundColor:"red"}}>
      <div> 
        <div>
        <Row> 
        <Col xl={10}><p style={{color:"white", marginLeft:"-315px", fontSize:"15px"}}> Indicate the conditions that have to be met during the matching process </p></Col>
        <Col xl={2}> </Col>
        </Row>
      </div>
        <Container style={{color:"white"}}> 

        <List dense className={classes.root}>
        {[{"key":0,
          "desc":"Mentees having at most 3 Mentors"
          },
          {"key":1,
          "desc":"Mentors having at most 3 Mentees"
          },
          {"key":2,
          "desc":"Mentors and mentees must be from different teams/chain of command"
          },
          {"key":3,
          "desc":"Fulfil Internal Transfer Mentorship"
          },
          {"key":4,
          "desc":"Skill  Capabilities Alignment"
          },
          {"key":5,
          "desc":"Female Mentees having at least one Female Mentor"
          },
          {"key":6,
          "desc":"L4/5 Mentees having at least one L5/6 Mentor"}].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
            <ListItem key={value.key} button>
                <ListItemAvatar>
                {/* <Avatar/> */}
                <GroupRoundedIcon/>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value.desc}`} />
                <ListItemSecondaryAction>
                <CustomCheckBox
                    edge="end"
                    onChange={handleToggle(value.key)}
                    checked={checked.indexOf(value.key) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                </ListItemSecondaryAction>
            </ListItem>
            );
          }
        )
        }
      </List>
      <Row>
            <Col xl={5}> </Col>
            <Col xl={7}><p style={{color:"white", fontSize:"12px", opacity:'0.65', float:"right", marginRight:'20px'}}> Note: Conditions that are not checked will be fulfiled on a best-effort basis </p></Col>
            {/* <Col xl={2}> </Col> */}
      </Row>
      </Container> 
      </div> 
    );
    }
}


    const handleFileChange=e=>{
        const file = e.target.files[0]
        console.log("File", file.type)
        if (file.type==="application/xlsx" || file.type==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ) {
          setprofileState({
          fileUrl:URL.createObjectURL(file),
          file,
          filename:file.name,
          filesize:file.size/1000
        });
        setfileLocalStorage(true)
        setinvalidFiletype(false)
        } else {
            console.log("Invalid file type")
            setinvalidFiletype(true) 
        }
      }
      
    const onDrop = useCallback(e => {
        const file = e[0];
        console.log("File", file.type)
        if (file.type==="application/xlsx" || file.type==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ) {
        console.log(file)
        console.log(file.type)
        setprofileState({
            fileUrl:URL.createObjectURL(file),
            file,        
            filename:file.name,
            filesize:file.size/1000
          });
          setfileLocalStorage(true)
          setinvalidFiletype(false)
        } else {
            console.log("Invalid file type")
            setinvalidFiletype(true)
        }
      }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const saveFile=()=>{
        setisLoading(true)
      const sorted_checked = checked.sort()
      console.log("Sorted array: ", sorted_checked)

      if (sorted_checked.includes(0) && sorted_checked.includes(1) && sorted_checked.includes(2) && sorted_checked.includes(3) && sorted_checked.includes(4) && sorted_checked.includes(5) && sorted_checked.includes(6) ) {
        var path = "input/strictest/"+profileState.filename
        console.log(path)
        Storage.put(path, profileState.file)
        .then(()=>{
          console.log("Successfully saved file!")
          setfileUploaded(true);
          setisLoading(false);
        })
        .catch(err=>{
          console.log("Error uploading file", err)
        })
      } 
      else if (sorted_checked.includes(0) && sorted_checked.includes(1) && sorted_checked.includes(2) && sorted_checked.includes(3) && sorted_checked.includes(4) && sorted_checked.includes(5) ) { 
        var path = "input/allowsameteams/"+profileState.filename
        console.log(path)
        Storage.put(path, profileState.file)
        .then(()=>{
          console.log("Successfully saved file!")
          setfileUploaded(true);
          setisLoading(false);
        })
        .catch(err=>{
          console.log("Error uploading file", err)
        })
      }
      else {
        console.log("Default")
        var path = "input/allowsameteams/"+profileState.filename
        console.log(path)
        Storage.put(path, profileState.file)
        .then(()=>{
          console.log("Successfully saved file!")
          setfileUploaded(true);
          setisLoading(false);
        })
        .catch(err=>{
          console.log("Error uploading file", err)
        })
      }
    }

      const isLoadingMethod = () => {
        if (fileLocalStorage === true && isLoading===true) {
    return (
    <Button variant="primary" style={{backgroundColor:"#D6D8D8",paddingLeft:"2rem", paddingRight:"2rem", border:"none", borderRadius:"0px"}} onClick={saveFile}><Spinner animation="border" style={{height:"23px", width:"23px"}} /></Button>
    )
        } else if (fileLocalStorage === true && isLoading===false) {
    return (
        <Button variant="primary" style={{backgroundColor:"#D6D8D8",paddingLeft:"2rem", paddingRight:"2rem", border:"none", borderRadius:"0px"}} onClick={saveFile}>Upload</Button>
    )
        } else {
            return (
                <>
                </>
            )
        }
      }


    const fileUploadedMethod = () => {
        if (profileState.fileUrl!=="init") {
            return (
                <div style={{marginTop:"10px"}}>{profileState.filename}</div>
            )
        } else {
            return (
                <div style={{marginTop:"10px"}}>
                    
                </div>
            )
        }
    }

    const downloadReadyMethod = () => {
if (downloadReady===true) { 
    return (
        <Button variant="primary" style={{backgroundColor:"#D6D8D8",paddingLeft:"2rem", paddingRight:"2rem", border:"none", borderRadius:"0px"}} onClick={downloadFile}>Download</Button>
    )
} else if (downloadReady===false && fileUploaded===true) {
 return (
    <Button variant="primary" style={{backgroundColor:"#D6D8D8",paddingLeft:"2rem", paddingRight:"2rem", border:"none", borderRadius:"0px"}} onClick={downloadFile}><Spinner animation="border" style={{height:"23px", width:"23px"}} /></Button>
 )
} else if (downloadReady===false) {
    return (
<> </> 
    )
}
}

    const downloadFile=()=>{
      console.log("Filename:", profileState.filename)
      var reportName = "output/"+profileState.filename
      console.log(reportName)
      Storage.get(reportName, { download: false })
      .then((data)=>{
        console.log("Downloaded Data: ", data)
        window.open(data)
      })
      .catch(err=>{
        console.log("Error uploading file", err)
      })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(fileUploaded)
            if (fileUploaded===true){
        var reportName = "output/"+profileState.filename
            Storage.list('output/',{level :'public'})
            .then(result => {
                console.log(result)
                console.log(reportName)
              result.map((key) => {
                if (reportName == key.key){
                  console.log("Existing Profile Picture found in S3 bucket:", key.key);
                  setdownloadReady(true)
                  console.log(downloadReady)
                  clearInterval(interval)
                }
              })
            })
            .catch(err => console.log(err));
  }}
  , 10000);
    return () => clearInterval(interval);
},[fileUploaded]);


const ComponentMethod = () => {
    if (fileLocalStorage===true) { 
        return (
 
        <div>
            <div style={{backgroundColor:"#DCEEF8",height:"50px",marginTop:"25px", padding:"1%", paddingLeft:"3%", color:"white"}}>  
            <Row style={{fontSize:'13px', color:"black", marginTop:"5px"}}>
            <Col xl={1}> <p style={{float:"left"}}> 1 Files</p> </Col> 
            <Col xl={2}> <p style={{float:"left"}}> <b> Size: </b> {profileState.filesize} KB</p> </Col> 
            <Col xl={7}> <p style={{float:"left", marginLeft:'-30px'}}> <b> Target path: </b>/public/input/{profileState.filename} </p> </Col> 
            <Col xl={2}></Col> 
            {/* <Col xl={3}> </Col>  */}
            </Row>
            </div>
            <div style={{backgroundColor:"#4E6573", height:"100px", paddingLeft:"5%", paddingRight:'5%', paddingTop:"1%", color:'white'}}>   

            <Row>
            <p className="secondary-text"> To upload a file larger than 160 GB, use the AWS CLI, AWS SDK, or Amazon S3 REST API. Learn more <RiShareBoxLine style={{ marginBottom:"2px"}}/> </p>
            </Row>
            <hr style={{backgroundColor:"white", padding:'-5%'}} />
            <Row>
                <Col xl={1}> <AiOutlineFileWord style={{height:"50px"}}/></Col>
                <Col xl={10}> <Row> <p style={{float:"left"}}> {profileState.filename} </p> </Row> <Row style={{float:"left", marginTop:'-20px'}}> {profileState.filesize} KB </Row> </Col>
                <Col xl={1} onClick={removeFile}> <ImCross style={{marginTop:"10px", marginRight:"70px",height:"18px"}}/> </Col>
            </Row>
            <hr style={{backgroundColor:"white", padding:'-5%'}} />
            </div> 
        </div>

        )

    } else if (fileLocalStorage === false && isDragActive === false){
        return (
            <> 
            <Row >
            <p className="secondary-text"> To upload a file larger than 160 GB, use the AWS CLI, AWS SDK, or Amazon S3 REST API. Learn more <RiShareBoxLine style={{ marginBottom:"2px"}}/> </p>
            </Row>

            <div style={{paddingTop:"6%", color:"white"}}> 
              <Row>
              <Col></Col>
              <Col><IoMdPhotos style={{height:"100px", width:"100px", opacity:"0.6"}}/></Col>
              <Col></Col>
              </Row>

              <Row>
              <Col></Col>
              <Col><h5>Drag and drop data here</h5></Col>
              <Col></Col>
              </Row>

              <Card.Text>
              With supporting text below as a natural lead-in to additional content.
              </Card.Text>

              <Row>
              <Col></Col>
              <Col><Button variant="primary" style={{backgroundColor:"#64A8D7",paddingLeft:"2rem", paddingRight:"2rem", border:"none",borderRadius:"0px"}}><b>Add Data</b></Button></Col>
              <Col></Col>
              </Row>

              <Row>
              <Col></Col>
              <Col>{fileUploadedMethod()}</Col>
              <Col></Col>
              </Row>
              <Row className="text-center">
                  {invalidFiletype ? (
                      <>
                      <Col xl={3}></Col>
                      <Col xl={6}> <p>  Invalid File Type! <br/> Current supported file types: xlsx   </p> </Col>
                      <Col xl={3}></Col>
                    
                      </> 
                  ) : (
                      <>
                      </> 
                  )}
              </Row>
          </div>
            </>
        )
    } else if (fileLocalStorage === false && isDragActive === true) {
        return (
            <>
              <Row >
            <p className="secondary-text"> To upload a file larger than 160 GB, use the AWS CLI, AWS SDK, or Amazon S3 REST API. Learn more <RiShareBoxLine style={{ marginBottom:"2px"}}/> </p>
            </Row>
<div 
            style={{
              border: 'dashed grey 4px',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'absolute',
              alignContent:'center',
              alignItems:"center",
              top: "23%",
              bottom: 0,
              left: "5%", 
              right: 0,
              zIndex: 9999,
              height:"65%",
              width:"90%",

            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '19%',
                textAlign: 'center',
                color: 'grey',
                height:"90%",
                width:"100%",
              }}
            >
            <div style={{width:"100%"}}> 
            <Row>
            <Col></Col>
            <Col><IoMdPhotos style={{height:"100px", width:"100px", opacity:"0.6"}}/></Col>
            <Col></Col>
            </Row>

            <Row>
            <Col></Col>
            <Col><h5>Drag and drop data here</h5></Col>
            <Col></Col>
            </Row>
            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Row>
            <Col></Col>
            <Col><Button variant="primary" style={{backgroundColor:"#64A8D7",paddingLeft:"2rem", paddingRight:"2rem", border:"none",borderRadius:"0px"}}><b>Add Data</b></Button></Col>
            <Col></Col>
            </Row>
            </div>
            </div>
          </div>
              </>
        )
    }
}

const removeFile = () => {
    setprofileState({
        fileUrl:"init",
        file:"init",        
        filename:"init",
        filesize:"init"
      });
      setfileLocalStorage(false);
      setinvalidFiletype(false);
      setdownloadReady(false);
      setfileUploaded(false)
}

// console.log("Get Props:", getInputProps)
// console.log("Get Props 2:", getRootProps)

    return (
        <div style={{padding:"5%"}}>
            <Container>
            <Card className="text-center">
            <Card.Header className="text-center" style={{backgroundColor:"#64A8D7", height:"100px",color:"#FFFFFF"}}> 
                <Row className="text-center" style={{marginTop:"12px"}}> 
                <Col></Col>
                <Col><h4> Upload </h4></Col>
                <Col></Col>
                </Row>
                <Row style={{marginTop:"13px", fontSize:"14px"}}>
                <Col>1) Upload Mentor Mentee Data</Col>
                <Col>2) Matching Algorithm Runs</Col>
                <Col>3) Download Mentor-Mentee Mappings</Col>
                </Row>
            </Card.Header>
            <Card.Body style={{backgroundColor:"#526571", height:"660px", padding:"0%"}}>
          <div> 
              <div {...getRootProps()} >
                  <input {...getInputProps()} />
                       {ComponentMethod()}
              </div>
                <div style={{marginTop:"10vh",backgroundColor:"#4E6573"}}>
                  <div> 
                <Container> 
                <Row>
                <Col xl={1}></Col> 
                <Col xl={10}> {RequirementChecklist()}</Col> 
                <Col xl={1}></Col> 
                </Row> 
               </Container> 
                </div>
                </div>     
          </div> 
            </Card.Body>
                {/* <Card.Footer className="text-muted" style={{backgroundColor:"yellow"}}> */}
                <Card.Footer className="text-muted" style={{backgroundColor:"#526571"}}>
                    <Row> 
                    <Col xl={2}>{isLoadingMethod()}</Col> 
                    <Col xl={8}></Col>
                    <Col xl={2}> 
                    {downloadReadyMethod()}
                    </Col>
                    </Row> 
                </Card.Footer>
            </Card>
            </Container>
      
      </div>
    )

}

export default CardComponent; 