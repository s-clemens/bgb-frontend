import React from 'react';
import "./Boardgame.css";

function Boardgame ({ data }) {

    return(
        <div className={'boardgame-item'}>

            <div className={'boardgame-item-container1'}>
            <img src={data.coverimage} />
            </div>

            <div className={'boardgame-item-container2'}>
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
                            Speelduur:
                        </span>
                        <span className={'right'}>
                              {data.boardgametype}
                        </span>
                    </li>
                    <li>
                        <span className={'left'}>
                            Aantal spelers:
                        </span>
                        <span className={'right'}>
                             {data.minplayers} tot {data.maxplayers}
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
            <div className={'boardgame-item-container3'}>
                <p className={'head'}>
                    Beschrijving:
                </p>
                <p className={'boardgame-description'}>
                    {data.descriptions}
                </p>
            </div>

        </div>
    )
}

export default Boardgame