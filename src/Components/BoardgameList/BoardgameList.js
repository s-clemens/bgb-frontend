import Boardgame from "./Boardgame/Boardgame";
import React, {useEffect, useState} from 'react';
import './boardgameList.css';
import axios from "axios";

const endpointLink = 'http://localhost:8080/api/product/boardgame/all'

function BoardgameList() {
    const [boardgameData, setBoardgameData] = useState(null);
    const [apirError, setApiError] = useState("")

    useEffect(() => {
        async function fetchBoardGameData() {
            const token = localStorage.getItem('token');

            try {
                const result = await axios.get(endpointLink, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                console.log(result.data);
                setBoardgameData(result.data)
            } catch (e) {
                setApiError('Er is iets mis gegaan bij het ophalen van de gegevens. ' +
                    'Probeer het later nog een keer. ')
            }
        }
        fetchBoardGameData();
    }, [endpointLink])

    return(
    <>
        {boardgameData && boardgameData.map(boardgame => (
            <Boardgame key={boardgame.name} data={boardgame}/>))}
        { apirError && <p className={'api-error-text'}>{apirError}</p>}
    </>
    )
}

export default BoardgameList;