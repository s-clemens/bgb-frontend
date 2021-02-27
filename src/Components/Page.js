import React from "react";
import backgroundtile from "../images/test-bg-image.jpg";

function Page( {children} ){
    return (
        <div className="page" style={{ backgroundImage: `url(${backgroundtile})` }}>
            {children}
    </div>)
}

export default Page;