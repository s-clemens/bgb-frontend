import Consumable from "./consumable/Consumable";
import React, {useEffect, useState} from 'react';
import './ConsumableList.css';
import axios from "axios";
const endpointLink = 'http://localhost:8080/api/product/consumable/all'

function ConsumableList() {
    const [consumableData, setConsumableData] = useState(null);
    const [apirError, setApiError] = useState("")

    useEffect(() => {
        async function fetchConsumableData() {
            const token = localStorage.getItem('token');
            try {
                const result = await axios.get(endpointLink, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                setConsumableData(result.data)
            } catch (e) {
                setApiError('Er is iets mis gegaan bij het ophalen van de gegevens. Probeer het later nog een keer')
            }
        }
        fetchConsumableData();
    }, [endpointLink])

    return(
        <>
            {consumableData && consumableData.map(consumable => (
                <Consumable key={consumable.name} data={consumable}/>))}
            { apirError && <p className={'api-error-text'}>{apirError}</p>}
        </>
    )
}

export default ConsumableList;