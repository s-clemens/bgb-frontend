import React from "react";
import "./LineBreak.css";

const LineBreak = ({ width, height, color}) => {
    return(
        <>
        <div className='linebreak' style={{width: width, height: '3px'}}/>
        </>
    )
}

export default LineBreak;