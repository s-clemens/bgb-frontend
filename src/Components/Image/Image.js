import React from "react";
import "./Image.css";

const Image = ({src}) => {

    return(
        <div className='image-container'>
            <img className='image-component' src={src}  />
        </div>
    )
}
export default Image;