import React from "react";
import "./Image.css";

const Image = ({src, banaan, id}) => {

    return(
        <div className={banaan}>
            <img id={id} src={src}  />
        </div>
    )
}
export default Image;