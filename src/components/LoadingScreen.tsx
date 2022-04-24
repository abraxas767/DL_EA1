import CircularProgress from '@mui/material/CircularProgress';
import { theme } from '../theme';

export function LoadingScreen(){
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
    )
}
