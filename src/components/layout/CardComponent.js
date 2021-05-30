
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
import { Alert, AlertTitle } from '@material-ui/lab';

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

    const [checked, setChecked] = useState([2,3]);
    const [error, setError]=useState(false)
    const [counter,setCounter]=useState(0)
    const [startTime, setStartTime] = useState(undefined)

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
        console.log("currentIndex: ",currentIndex)
        const newChecked = [...checked];
        console.log("newChecked: ",newChecked)

        if (currentIndex === -1) {
          var i;
          for (i=0;i<value;i++){
            if (!newChecked.includes(i)){
              newChecked.push(i)
            }
          }
        newChecked.push(value);
        console.log("newChecked 1: ",newChecked)
        } else {
        newChecked.splice(currentIndex, 1);
        console.log("newChecked 2: ",newChecked)
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
      <div> 
        <div>
        <Row> 
        <Col xl={10}><p style={{color:"white", marginLeft:"-315px", fontSize:"15px"}}> Indicate the conditions that have to be met during the matching process </p></Col>
        <Col xl={2}> </Col>
        </Row>
      </div>
        <Container style={{color:"white"}}> 

        <List dense className={classes.root}>
        {[{"key":2,
          "desc":"Mentors and mentees must be from different teams"
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
            var max_of_array = Math.max.apply(Math, checked);
            // console.log("Array :",checked);
            // console.log("Max Array :", max_of_array);
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
                    checked={(value.key<=max_of_array) ? true : false}
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
        setError(false)
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
          setError(false)
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

      if(sorted_checked.includes(6)) {
        var path = "input/5/"+profileState.filename
        console.log(path)
        Storage.put(path, profileState.file)
        .then(()=>{
          console.log("Successfully saved file!")
          setfileUploaded(true);
          setisLoading(false);
          setStartTime(new Date().getTime()) 
           console.log(startTime)
        })
        .catch(err=>{
          console.log("Error uploading file", err)
          setStartTime(new Date().getTime()) 
          console.log(startTime)
        })
    } else if(sorted_checked.includes(5)) {
      var path = "input/4/"+profileState.filename
      console.log(path)
      Storage.put(path, profileState.file)
      .then(()=>{
        console.log("Successfully saved file!")
        setfileUploaded(true);
        setisLoading(false);
        setStartTime(new Date().getTime()) 
         console.log(startTime)
      })
      .catch(err=>{
        console.log("Error uploading file", err)
        setStartTime(new Date().getTime()) 
        console.log(startTime)
      })
  } else if(sorted_checked.includes(4)) {
    var path = "input/3/"+profileState.filename
    console.log(path)
    Storage.put(path, profileState.file)
    .then(()=>{
      console.log("Successfully saved file!")
      setfileUploaded(true);
      setisLoading(false);
      setStartTime(new Date().getTime()) 
       console.log(startTime)
    })
    .catch(err=>{
      console.log("Error uploading file", err)
      setStartTime(new Date().getTime()) 
      console.log(startTime)
    })
} else if(sorted_checked.includes(3)) {
  var path = "input/2/"+profileState.filename
  console.log(path)
  Storage.put(path, profileState.file)
  .then(()=>{
    console.log("Successfully saved file!")
    setfileUploaded(true);
    setisLoading(false);
    setStartTime(new Date().getTime()) 
     console.log(startTime)
  })
  .catch(err=>{
    console.log("Error uploading file", err)
    setStartTime(new Date().getTime()) 
    console.log(startTime)
  })
} else if(sorted_checked.includes(2)) {
  var path = "input/1/"+profileState.filename
  console.log(path)
  Storage.put(path, profileState.file)
  .then(()=>{
    console.log("Successfully saved file!")
    setfileUploaded(true);
    setisLoading(false);
    setStartTime(new Date().getTime()) 
     console.log(startTime)
  })
  .catch(err=>{
    console.log("Error uploading file", err)
    setStartTime(new Date().getTime()) 
    console.log(startTime)
  })
} else {
  var path = "input/0/"+profileState.filename
  console.log(path)
  Storage.put(path, profileState.file)
  .then(()=>{
    console.log("Successfully saved file!")
    setfileUploaded(true);
    setisLoading(false);
    setStartTime(new Date().getTime()) 
     console.log(startTime)
  })
  .catch(err=>{
    console.log("Error uploading file", err)
    setStartTime(new Date().getTime()) 
    console.log(startTime)
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
        <Button variant="primary" style={{backgroundColor:"#D6D8D8",paddingLeft:"2rem", paddingRight:"2rem", border:"none", borderRadius:"0px"}} onClick={saveFile}>Match</Button>
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

          if(typeof startTime!=="undefined"){
            console.log("Inside undefined if else: ", startTime)
            if (new Date().getTime() - startTime > 15000){
              clearInterval(interval)      
              setError(true)
              setisLoading(false)
              setfileLocalStorage(false);
              setinvalidFiletype(false);
              setdownloadReady(false);
              setfileUploaded(false)
            }
          }

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
  , 1000);
    return () => clearInterval(interval);
},[fileUploaded,startTime]);


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
            <p className="secondary-text"> If you are unsure of the data format requirements, download a dataset template here. <RiShareBoxLine href="https://mentor-mentee-matching-bucket190958-dev.s3.amazonaws.com/public/assets/Template.xlsx" onClick={()=>{window.open("https://mentor-mentee-matching-bucket190958-dev.s3.amazonaws.com/public/assets/Template.xlsx","_blank")}}style={{ marginBottom:"2px", zIndex:"5", cursor:"pointer"}}/> </p>
            </Row>
            <hr style={{backgroundColor:"white", padding:'-5%'}} />
            <Row>
                <Col xl={1} > <AiOutlineFileWord style={{height:"50px"}}/></Col>
                <Col xl={10} > <Row> <p style={{float:"left"}}> {profileState.filename} </p> </Row> 
                <Row style={{float:"left", marginTop:'-20px'}}> {profileState.filesize} KB </Row> </Col>

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
            <p className="secondary-text"> If you are unsure of the data format requirements, download a dataset template here. <RiShareBoxLine href="https://mentor-mentee-matching-bucket190958-dev.s3.amazonaws.com/public/assets/Template.xlsx" onClick={()=>{window.open("https://mentor-mentee-matching-bucket190958-dev.s3.amazonaws.com/public/assets/Template.xlsx","_blank")}}style={{ marginBottom:"2px", zIndex:"5", cursor:"pointer"}}/> </p>
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
              Alternatively, upload dataset by clicking on the button below. 
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
              <p className="secondary-text"> If you are unsure of the data format requirements, download a dataset template here. <RiShareBoxLine href="https://mentor-mentee-matching-bucket190958-dev.s3.amazonaws.com/public/assets/Template.xlsx" onClick={()=>{window.open("https://mentor-mentee-matching-bucket190958-dev.s3.amazonaws.com/public/assets/Template.xlsx","_blank")}}style={{ marginBottom:"2px", zIndex:"5", cursor:"pointer"}}/> </p>
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
            Alternatively, upload dataset by clicking on the button below. 
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
            <Card.Body style={{backgroundColor:"#526571", height:"650px", padding:"0%"}}>
          <div> 
              <div {...getRootProps()} >
                  <input {...getInputProps()} />
                       {ComponentMethod()}
              </div>
                <div style={{marginTop:"14vh",backgroundColor:"#4E6573"}}>
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
                <Card.Footer className="text-muted" style={{backgroundColor:"#526571"}}>
                    <Row> 
                    <Col xl={2} l={3} s={3}>{isLoadingMethod()}</Col> 
                    <Col xl={8} l={6} s={8}>
                      { (error) ? (
                        <center> <Alert variant="filled" severity="error" style={{color:"white", opacity:'0.75', height:"95%", width:"85%",left:"50%"}}>There is an error during the matching process, please retry or reach out to thaiwg@ </Alert> </center> 
                      ) :<> </>
                    }
                    </Col>
                    <Col xl={2} l={3} s={3}> 
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