import React, {useCallback, useState, useEffect} from "react"
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
import  { Analytics }  from "aws-amplify"

const CardComponent = () => {
    var count = 0
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
      var path = "input/"+profileState.filename
      Storage.put(path, profileState.file)
        .then(()=>{
          console.log("Successfully saved file!")
          setfileUploaded(true);
          setisLoading(false);
          count=count+1
          Analytics.record({count:"number of uploads"})
          console.log("Analytics:", count)
        })
        .catch(err=>{
          console.log("Error uploading file", err)
        })
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
  , 5000);
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
            <Col><h5>Drag and drop files here</h5></Col>
            <Col></Col>
            </Row>

            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            </Card.Text>

            <Row>
            <Col></Col>
            <Col><Button variant="primary" style={{backgroundColor:"#64A8D7",paddingLeft:"2rem", paddingRight:"2rem", border:"none",borderRadius:"0px"}}><b>Add Files</b></Button></Col>
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
            <Col><h5>Drag and drop files here</h5></Col>
            <Col></Col>
            </Row>
            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Row>
            <Col></Col>
            <Col><Button variant="primary" style={{backgroundColor:"#64A8D7",paddingLeft:"2rem", paddingRight:"2rem", border:"none",borderRadius:"0px"}}><b>Add Files</b></Button></Col>
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

console.log("Get Props:", getInputProps)
console.log("Get Props 2:", getRootProps)



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
                <Col>1) Upload Files </Col>
                <Col>2) Annotation Algorithm Runs</Col>
                <Col>3) Download Audit Report</Col>
                </Row>
            </Card.Header>
            <Card.Body style={{backgroundColor:"#526571", height:"500px", padding:"0%"}}>

<div> 
    <div {...getRootProps()} >
      <input {...getInputProps()} />
      {ComponentMethod()}
    </div>         
    </div> 
            </Card.Body>

            <Card.Footer className="text-muted" style={{backgroundColor:"#526571"}}>
                <Row> 
                <Col xl={2}>{isLoadingMethod()}</Col> 
                <Col xl={8}></Col>
                <Col xl={2}> 
                {downloadReadyMethod()}
                </Col>
                </Row> 
                {/* 2 days ago */}
            </Card.Footer>
            </Card>
            </Container>


        </div>
    )

}

export default CardComponent; 