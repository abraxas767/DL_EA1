// MODULES
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import { Outlet, Link } from "react-router-dom";

// MUI
import { theme } from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';

// COMPONENTS
import { ImageRows } from '../components/ImageRows';
import { LoadingScreen } from '../components/LoadingScreen';
import { Result } from '../components/Result';
import Faultier from '../img/Faultier.jpeg';

function MainContainer(){

  // REQUIRE THE ML5 MODULE
  const ml5 = require('ml5');
  // CONTROLS PROGRESS DISPLAY
  const [ isClassifying, setIsClassifying ] = useState(false);
  // HOLDS ML5 IMAGE CLASSIFYER OBJECT
  const [ classifier, setClassifier ] = useState(null);
  // USED TO DETERMINE WHEN MODEL IS LOADED TODO: Backdrop while loading?
  const [ modelLoaded, setModelLoaded ] = useState(false);
  // HOLDS PREVIEW URL
  const [ previewURL, setPreviewURL ] = useState(Faultier);
  // HOLDS IMAGE REFERENCE
  const toClassify = useRef(null);
  // HOLDS RESULT
  const [ result, setResult ] = useState([
    // default results
    {label: "null", confidence: 0},
    {label: "null", confidence: 0},
    {label: "null", confidence: 0},
  ]);
  // OPENS RESULT DIALOG
  const [ resultOpen, setResultOpen ] = useState(false);
  // ON DROP FUNCTION
  const onDrop = (acceptedFiles: any) => {
      const file: any = acceptedFiles[0];
      setPreviewURL(URL.createObjectURL(file));
      classifyImg();
    };
  // DROPZONE
  const { getRootProps, getInputProps } = useDropzone({accept: 'image/jpeg,image/png', onDrop: onDrop});


  /*
     Check if the classifier is still null.
     If so, initialize ML5 Image Classifier
  */
  if(classifier === null){
    console.log("initializing ml5 image classifier");
    ml5.imageClassifier('MobileNet').then((res: any)=>{
      // This will run after the page is rendered.
      // res will be saved in state but is only available
      // in useEffect-hook (which runs after render)
      setClassifier(res);
      console.log("classifier saved in state, available in next render");
      // catch errors
    }).catch((err: any) => console.log(err));
  }


  useEffect(() => {
    // will trigger rerender and thus make classifier
    // available for classifyImg-Function
    if(classifier !== null){
      console.log("model available in state");
      setModelLoaded(true);
    }
    // needs to have classifier dependency
  }, [classifier])


  // CLASSIFY THE IMAGE
  function classifyImg(): void{
    // only run if model is loaded and classifier is available
    if(classifier === null || modelLoaded === false){return;}
    console.log("classifying...");
    setIsClassifying(true);
    // Wait recursively for preview image to get set
    if(toClassify.current == null){
      setTimeout(classifyImg, 300);
      return;
    }
    // PREDICT preview image
    classifier.classify((toClassify.current), function(err: any, results:any){
      setIsClassifying(false);
      setResult(results);
      setResultOpen(true);
      console.log(results);});
  }

  function onDefaultImgHandler(url: string){
    setPreviewURL(url);
    classifyImg();
  }

  const style = {
    background: theme.palette.secondary.main,
    height: "350px",
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "1px dashed red",
    borderColor: theme.palette.primary.main,
  };


  let content = (<></>);

  if(!modelLoaded){
      // RENDER LOADING SCREEN WHEN MODEL NOT LOADED
      return <LoadingScreen/>
  } else {

    if(isClassifying) {
        // IMAGE LOADING
        content = (
            <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Box sx={{
                    maxWidth: "300px",
                    opacity: "0.4",
                    position: "absolute",
                    display: "flex",
                }}>
                    <img ref={toClassify} width="100%" src={previewURL} alt="Faultier"/>
                </Box>
                <Box sx={{
                    width: "300px",
                    height: "100px",
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <CircularProgress color="success"/>
                </Box>
            </div>
        )
    } else {
        // RENDER DROPZONE
        content = (
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>Place your image here or click to upload...</p>
        </div>);
    }
  }

  return (
    <ThemeProvider theme={theme}>

        {/* HEADING */}
        <Container sx={{
            height: "100px",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Helvetica",
            fontWeight: "",
        }}>
            <div>
                <h1>ML5 Image Classifier</h1>
                <hr />
            </div>
        </Container>
        {/* ------------------------------ */}



        {/* RENDER EITHER: DROPZONE OR LOADINGIMAGE */}
        <Container>
            <Paper elevation={3} sx={{
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
            }}>
                {content}
            </Paper>
            <ImageRows handler={onDefaultImgHandler}/>
        </Container>
        {/* ------------------------------ */}



        {/* RENDER ACTUAL RESULT */}
        <Result
            result={result}
            resultOpen={resultOpen}
            setResultOpen={setResultOpen}
            toClassify={toClassify}
            previewURL={previewURL}
        />
        {/* ------------------------------ */}

        <div style={{position: "absolute", paddingLeft: "30px", fontSize:"20px" }}>
          <Link style={{textDecoration: "none"}} to="/doc">Documentation</Link>
        </div>

    </ThemeProvider>
  );
}

export default MainContainer;
