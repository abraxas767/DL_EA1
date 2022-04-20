// MODULES
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Plotly from "plotly.js";
import Plot from 'react-plotly.js';

// MUI
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

// COMPONENTS
import { DefaultImg } from './components/DefaultImg';
import styles from './components/main.module.css';

// IMG
import Faultier from './img/Faultier.jpeg';
import Fussball from './img/Fussball.jpeg';
import Telephone from './img/Telephone.jpeg';
import Fish from './img/fish.jpeg';

function App() {

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



  useEffect(()=>{
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
      setTimeout(classifyImg, 1000);
      return;
    }
    // PREDICT preview image
    classifier.classify((toClassify.current), function(err: any, results:any){
      setIsClassifying(false);
      console.log(results);});
  }


  const onDrop = (acceptedFiles: any) => {
      const file: any = acceptedFiles[0];
      setPreviewURL(URL.createObjectURL(file));
      classifyImg();
    };

  const { getRootProps, getInputProps } = useDropzone({accept: 'image/jpeg,image/png', onDrop: onDrop});

  const style = {
    background: theme.palette.secondary.main,
    height: "250px",
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "1px dashed red",
    borderColor: theme.palette.success.main,
  };


  let content = (<></>);

  if(!modelLoaded){
    return (
      <Container sx={{
        zIndex:"55",
        width: "100%",
        height:"100%",
        position: "absolute",
        background: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column",
      }}>
          <span style={{color: theme.palette.primary.main, marginBottom: "20px"}}>Loading Model</span>
          <CircularProgress color="success"/>
      </Container>
    );
  } else {



    if(isClassifying){
      content = (
        <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{
              width: "300px",
              opacity: "0.4",
              position: "absolute"
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
      content = (
            <div {...getRootProps({style})}>
              <input {...getInputProps()} />
              <p>Place your image here or click to upload...</p>
            </div>);
    }



  }

  function onDefaultImgHandler(){
    console.log("hello world");
  }


  return (
    <ThemeProvider theme={theme}>
      <Container sx={{
        height: "100px",
        display: "flex",
        justifyContent: "center",
      }}>
        <h1>ML5 Image Classifier</h1>
      </Container>
      <Container>
        <Paper elevation={3} sx={{
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "30px",
        }}>

          {content}

        </Paper>

        <Container sx={{display: "flex",justifyContent: "center"}}>
          <DefaultImg handler={onDefaultImgHandler} alt="Faultier" url={Faultier}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Fussball" url={Fussball}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Telephone" url={Telephone}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Fish" url={Fish}/>
        </Container>

        <Paper>
         <Plot
           data={[
             {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
              },
              {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
            ]}
            layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
          />
        </Paper>

      </Container>
    </ThemeProvider>
  );
}

export default App;
