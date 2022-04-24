import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Plot from 'react-plotly.js';
import Box from '@mui/material/Box';

export function Result(props: any){
    const result = props.result;
    return(
      <Dialog
        open={props.resultOpen}
        onClose={() => props.setResultOpen(false)}
        fullWidth
        maxWidth="lg"
        sx={{display: "flex", justifyContent: "center"}}
      >
        <DialogTitle sx={{fontSize: "35px", color: "6600ff"}}>{result[0].label}</DialogTitle>
        <p style={{margin: "0 0 0 30px", padding: "0", color: "#944dff"}}>{result[1].label}</p>
        <p style={{margin: "5px 0 0 30px", padding: "0", color: "#d1b3ff"}}>{result[2].label}</p>
        <div style={{display: "flex"}}>
          <Box sx={{margin: "30px", display: "flex", justifyContent: "center", alignItems:"center"}}>
            <img ref={props.toClassify} style={{maxWidth: "400px"}} src={props.previewURL} alt="Faultier"/>
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
          <Button onClick={()=>props.setResultOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    )
}
