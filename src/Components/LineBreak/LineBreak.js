import React from "react";
import "./LineBreak.css";



const LineBreak = ({ width, height, color}) => {

    return(
        <>
        <div className='linebreak' style={{width: width, height: '3px'}}/>
        {/*    <hr></hr>*/}
        {/*<div className='linebreak' style={{width: '100%', height: '3px', backgroundColor: 'black'}}/>*/}

        </>

    )
}

export default LineBreak;