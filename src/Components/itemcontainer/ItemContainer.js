import React from 'react';
import "./ItemContainer.css";


const ItemContainer = ({ id, children }) => {

    return(
        <div className={'item-container'} id={id}>
            { children }
        </div>

    )
}

export default ItemContainer;