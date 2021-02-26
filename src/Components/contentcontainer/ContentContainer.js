import React from "react";
import "./ContentContainer.css";

const ContentContainer = ({ id, children }) => {


    return(
        <div className={'content-container'} id={id}>
            { children }
        </div>
    );
}

export default ContentContainer;