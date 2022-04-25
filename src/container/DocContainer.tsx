import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { CodeBlock } from "react-code-blocks";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

function DocContainer() {

    const navigate = useNavigate();

    const routing = (
    `<BrowserRouter>
      <Routes>
        {/* MAIN ML5 - APPLICATION */}
        <Route path="/ml5" element={<MainContainer />}/>
        {/* DOCUMENTATION */}
        <Route path="/doc" element={<DocContainer />}/>
      </Routes>
    </BrowserRouter>`);

    const ml5 = (
        `function MainContainer(){
  // REQUIRE THE ML5 MODULE
  const ml5 = require('ml5');`);

    const loadingScreen = (
        `if(!modelLoaded){
        // RENDER LOADING SCREEN WHEN MODEL NOT LOADED
        return <LoadingScreen/>`
    );

    const ml5_2 = (
    `// CONTROLS PROGRESS DISPLAY
  const [ isClassifying, setIsClassifying ] = useState(false);
  // HOLDS ML5 IMAGE CLASSIFIER OBJECT
  const [ classifier, setClassifier ] = useState(null);
  // USED TO DETERMINE WHEN MODEL IS LOADED
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
  ]);`);

    const ml5Loading = (
        `/*
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
        }`
    );

    const classifyImg = (
        `// CLASSIFY THE IMAGE
        function classifyImg(): void{
            // only run if model is loaded and classifier is available
            if(classifier === null || modelLoaded === false){return;}
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
            setResultOpen(true);});
        }`
    );

    return (
        <>
            <div style={{position: "absolute", padding: "30px"}}>

                <ArrowBackIcon onClick={()=>navigate("/ml5")} style={{cursor: "pointer"}}/>
            </div>
            <Container sx={{padding: "30px"}}>
                <h1>ML5-Bildklassifizierung - Dokumentation</h1>
                <p><i>Von Christoph Kaiser - Matrikelnmr: 346117</i></p>

                {/* ----------------------------------------  */}
                <h2>Tech-Stack</h2>

                    <Paper sx={{padding: "10px"}}>
                        <ul>
                            <li>typescript - 4.6.3</li>
                            <li>react - 18.0.0</li>
                            <li>node - 16.14.2</li>
                            <li>plotly.js - 2.11.1</li>
                            <li>ml5 - 0.12.1</li>
                            <li>react-code-blocks - 0.0.9</li>
                            <li>react-dropzone - 12.0.5</li>
                            <li>@mui/material - 5.6.1</li>
                        </ul>
                    </Paper>


                {/* ----------------------------------------  */}
                <h2>Umsetzung</h2>

                <h3>Erstellung</h3>
                <p>
                    Ich hoffe die Klassifizierungs-Anwendung, basierend auf dem
                    ML5-Framework hat Ihnen gefallen. Den kompletten Code können sie sich
                    auf <a href="https://github.com/abraxas767/DL_EA1">Github</a> anschauen. Im Folgenden werde ich nun eine
                    Übersicht über meine Vorhergehensweise bei der Umsetzung beschreiben:
                </p>
                <p>
                    Da ich durch meine Arbeit relativ viel mit der JavaScript Library <b>React</b> zu tun habe,
                    dachte ich mir diese Aufgabe wäre perfekt um mein Wissen in diesem Bereich zu testen und
                    mich gleichzeitig mit dem Thema "Deep Learning" auseinanderzusetzen. Wie bei jeder React Anwendung
                    startete ich mit der initialisierung des Projektes.
                </p>

                <Paper sx={{padding: "10px"}}>
                    <CodeBlock
                        text="npx create-react-app image_classifier --template typescript"
                        language="bash"
                        showLineNumbers={false}
                    />
                </Paper>

                <p>
                    Der obige Befehl funktioniert nur wenn npm sowie npx und node korrekt installiert sind. Ich
                    verwende Typescript da mir die Syntax und Features besser gefallen als plain Javascript.
                </p>




                {/* ----------------------------------------  */}
                <h3>Routing</h3>
                <p>
                    Die Struktur der Anwendung ist sehr simpel gehalten. Es gibt nur zwei
                    Komponenten die als Layout bzw. Container dienen. Einen für die
                    Anwendung(MainContainer) und einen für die Dokumentation(DocContainer). Erreichbar
                    jeweils über die Ergänzung <br/>http://$(IP):$(PORT)/<i>ml5 oder doc</i>.
                </p>
                <Paper sx={{padding: "10px"}}>
                    <CodeBlock
                        text={routing}
                        language="jsx"
                        showLineNumbers={false}
                    />
                </Paper>

                <p>
                    Da der DocContainer relativ uninteressant ist (da er hauptsächlich nur langweiliges
                    HTML bzw. JSX enthält) wird im Folgenden nicht weiter
                    darauf eingegangen. Erwähnenswert wäre einzig dass die schönen Code-Blöcke aus der
                    wunderbaren Library <b>react-code-blocks</b> stammen.
                </p>

                <h3>ML5 und React</h3>
                <p>
                    Kommen wir nun zu der Einbindung der ml5.js Library in das React-Projekt.
                    Die Syntax hier unterscheidet sich erstmal nicht vom Nicht-React-Ansatz.
                    Zuerst muss ml5 installiert werden.
                </p>

                <Paper sx={{padding: "10px"}}>
                    <CodeBlock
                        text="npm i --save ml5"
                        language="bash"
                        showLineNumbers={false}
                    />
                </Paper>
                <p>Anschließend können wir es in unserem MainContainer nutzen:</p>
                <Paper sx={{padding: "10px"}}>
                    <CodeBlock
                        text={ml5}
                        language="jsx"
                        showLineNumbers={false}
                    />
                </Paper>
                <p>
                    Da sich Komponenten in React sehr häufig neu rendern, muss sichergegangen
                    werden dass das Ml5-Model nur einmal geladen wird. Ansonsten würde die
                    Anwendung viel zu langsam und rechenintensiv werden. Daher nutze ich die
                    diversen React-Hooks um sicherzustellen dass das ML5-Model über rerender hinweg
                    persistiert wird:
                </p>
                <Paper sx={{padding: "10px"}}>
                    <CodeBlock
                        text={ml5_2}
                        language="jsx"
                        showLineNumbers={false}
                    />
                </Paper>
                <p>Beim ersten Aufruf wird der ml5-Classifier geladen. Dies kann eine Weile dauern:</p>
                <Paper sx={{padding: "10px"}}>
                    <CodeBlock
                        text={ml5Loading}
                        language="jsx"
                        showLineNumbers={false}
                    />
                </Paper>
                <p>
                    Solange das Model nicht fertig geladen ist kann ich somit einen
                    Ladebildschirm anzeigen:
                </p>
                <Paper sx={{padding: "10px"}}>
                    <CodeBlock
                        text={loadingScreen}
                        language="jsx"
                        showLineNumbers={false}
                    />
                </Paper>
                <p>
                    Sobald das Model dann fertig geladen ist können Bilder klassifiziert werden.
                    Dafür hier die classifyImg() - Methode:
                </p>
                <Paper sx={{padding: "10px"}}>
                    <CodeBlock
                        text={classifyImg}
                        language="jsx"
                        showLineNumbers={false}
                    />
                </Paper>
                <p>
                    Die classify-Methode von ML5 akzeptiert ein HTML-Image-Element. Dieses
                    wird als Preview mit einem Loading-Overlay gerendert, sobald der Nutzer ein
                    Bild hochläd. Zur gleichen Zeit wird die classifyImg() - Methode aufgerufen.
                    Da das Bild nicht schnell genug gerendert wird muss die classifyImg-Methode darauf
                    warten. Obwohl das Bild auch viel schneller von ml5 klassifiziert wird habe ich mich
                    entschieden als Mindestwartezeit 300ms einzustellen. Dies soll dem Nutzer als
                    Feedback dienen.
                </p>
            </Container>
        </>
    );
}

export default DocContainer;
