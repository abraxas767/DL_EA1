import React from 'react';
import Paper from '@mui/material/Paper';

interface DefaultImgInterface {
    url: string
    alt: string
    handler(): void
}

export function DefaultImg(props: DefaultImgInterface){
    const defaultImgsStyle = {
        width: "100px",
        height: "100px",
        margin: "5px",
        cursor: "pointer",
        overflow: "hidden",
    }
    return(
        <Paper onClick={props.handler} sx={defaultImgsStyle}>
            <img style={{
                height: "100%",
                width: "auto",
                objectFit: "cover",
            }} id={props.alt} alt={props.alt} src={props.url}/>
        </Paper>
    )
}
