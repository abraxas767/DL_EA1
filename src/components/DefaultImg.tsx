import React from 'react';
import Paper from '@mui/material/Paper';

interface DefaultImgInterface {
    url: string
    alt: string
    handler(url: string): void
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
        <Paper sx={defaultImgsStyle} >
            <img style={{
                height: "100%",
                width: "auto",
                objectFit: "cover",
            }}
                 id={props.alt}
                 alt={props.alt}
                 src={props.url}
                 onClick={()=>{props.handler(props.url)}}
                 />
        </Paper>
    )
}
