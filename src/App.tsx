// MODULES
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Plotly from "plotly.js";
import Plot from 'react-plotly.js';

// MUI
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

// COMPONENTS
import { DefaultImg } from './components/DefaultImg';
import styles from './components/main.module.css';

// IMG
import Faultier from './img/Faultier.jpeg';
import Fussball from './img/Fussball.jpeg';
import Telephone from './img/Telephone.jpeg';
import Fish from './img/fish.jpeg';
import Ente from './img/Ente.jpeg';
import Katze from './img/katze.jpeg';

import Mountain from './img/Mountain.jpeg';
import Native from './img/Native.jpeg';
import Rocket from './img/Rocket.jpeg';
import Tree from './img/Tree.jpeg';
import Crowd from './img/Crowd.jpeg';
import Hand from './img/Hand.jpeg';

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
  // HOLDS RESULT
  const [ result, setResult ] = useState([
    {label: "null", confidence: 0},
    {label: "null", confidence: 0},
    {label: "null", confidence: 0},
  ]);
  // OPENS RESULT DIALOG
  const [ resultOpen, setResultOpen ] = useState(false);


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
      setResult(results);
      setResultOpen(true);
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
    return (
      <div style={{
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
      </div>
    );
  } else {



    if(isClassifying){
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
      content = (
            <div {...getRootProps({style})}>
              <input {...getInputProps()} />
              <p>Place your image here or click to upload...</p>
            </div>);
    }



  }

  function onDefaultImgHandler(url: string){
    setPreviewURL(url);
    classifyImg();
  }


  return (
    <ThemeProvider theme={theme}>
      <Container sx={{
        height: "100px",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Helvetica",
        fontWeight: "400",
      }}>
        <div>
          <h1>ML5 Image Classifier</h1>
          <hr />
        </div>

      </Container>
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

        <Container sx={{display: "flex",justifyContent: "center"}}>
          <DefaultImg handler={onDefaultImgHandler} alt="Faultier" url={Faultier}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Fussball" url={Fussball}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Telephone" url={Telephone}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Fish" url={Fish}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Ente" url={Ente}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Katze" url={Katze}/>
        </Container>

        <Container sx={{display: "flex",justifyContent: "center"}}>
          <DefaultImg handler={onDefaultImgHandler} alt="Rocket" url={Rocket}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Tree" url={Tree}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Native" url={Native}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Crowd" url={Crowd}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Mountain" url={Mountain}/>
          <DefaultImg handler={onDefaultImgHandler} alt="Hand" url={Hand}/>
        </Container>

        <Paper>
        </Paper>

      </Container>
      <Dialog
        open={resultOpen}
        onClose={() => setResultOpen(false)}
        fullWidth
        maxWidth="lg"
        sx={{display: "flex", justifyContent: "center"}}
      >
        <DialogTitle sx={{fontSize: "35px", color: "6600ff"}}>{result[0].label}</DialogTitle>
        <p style={{margin: "0 0 0 30px", padding: "0", color: "#944dff"}}>{result[1].label}</p>
        <p style={{margin: "5px 0 0 30px", padding: "0", color: "#d1b3ff"}}>{result[2].label}</p>
        <div style={{display: "flex"}}>
          <Box sx={{margin: "30px", display: "flex", justifyContent: "center", alignItems:"center"}}>
            <img ref={toClassify} style={{maxWidth: "400px"}} src={previewURL} alt="Faultier"/>
          </Box>

          <Box sx={{margin: "30px"}}>
          <Plot
            data={[

                {
                  type: 'bar',
                  x: [result[0].label, result[1].label, result[2].label],
                  y: [result[0].confidence, result[1].confidence, result[2].confidence],
                  marker: {
                    color: [
                      '#6600ff',
                      '#944dff',
                      '#d1b3ff',
                    ]
                  },
                },
              ]}
              layout={ {
                width: 520,
                height: 440,
                title: 'Confidence from 0 to 1:',
              } }
            />
          </Box>
        </div>

        <DialogActions>
          <Button onClick={()=>setResultOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
