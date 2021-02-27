import React from 'react';
import "./Consumable.css";

function Consumable ({ data }) {

    return(
        <div className={'consumable-item'}>
            <div className={'consumable-item-container1'}>
                <img src={data.coverimage} />
            </div>

            <div className={'consumable-item-container2'}>
                <ul>
                    <li>
                        <span className={'left'}>
                            Naam:
                        </span>
                        <span className={'right'}>
                            {data.name}
                        </span>
                    </li>
                    <li>
                        <span className={'left'}>
                        Huurprijs:
                        </span>
                        <span className={'right'}>
                             {data.price} €
                        </span>
                    </li>
                </ul>
            </div>

            <div className={'consumable-item-container3'}>
                <p className={'head'}>
                    Eigenschappen:
                </p>
                <p className={'consumable-description'}>
                    {data.ingredients}
                </p>
            </div>
        </div>
    )
}

export default Consumable