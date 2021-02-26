import {useAuthState} from "../../context/AuthContext";
import Page from "../../Components/Page";
import Pagetitle from "../../Components/pagetitile/Pagetitle";
import LineBreak from "../../Components/LineBreak/LineBreak";
import ContentContainer from "../../Components/contentcontainer/ContentContainer";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from "axios";
import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Image from "../../Components/Image/Image";
import shield from "../../images/icons/shield-alt-solid.svg"
import "./Productadd.css";
import ErrorMessage from "../Signup/errorMessage";

let producttype = '';
const endpointlink = `http://localhost:8080/product/${producttype}`

function ProductAdd() {


    const { user, isAdmin } = useAuthState()

    const { handleSubmit, register } = useForm();

    // State voor gebruikers-feedback
    const [createSucces, setCreateSucces] = useState(false);
    // Zorgt voor state waarin we button value e.d. kunnen aanpassen op state.
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    // Als form wordt submit:
    async function onFormSubmit(date){
        console.log(data);
        toggleLoading(true);
        setError('')
        try {
            const response = await axios.post(endpointlink + producttype,{
                name: data.name,
                producttype: data.producttype,
                price: data.price,
                ingredients: data.ingredients,
                consumabletype: data.consumabletype,
                imagecover: data.imagecover,

                description: data.description,
                boardgametype: data.boardgametype,
                minplayers: data.minplayers,
                maxplayers: data.maxplayers,
                totalstock: data.totalstock
            });
            console.log("de volgende data is verstuurd:")
            console.log(response.data);
            {response.data && setCreateSucces(true)}
        } catch {
            console.log(e);
            if (e.message.includes('400')) {
                setError('Er bestaat al een account met deze username.')
            } else {
                setError('Er is iets misgegeaan bij het verzenden. Probeer het opnieuw.')
            }
        }
        toggleLoading(false);
    }

    return (
        <Page>
            <div className="page-container">
                <Pagetitle>PRODUCT TOEVOEGEN</Pagetitle>
                <LineBreak height={'5px'} width={'80%'} color={'black'} >""</LineBreak>

                <ContentContainer id={'dashboard-container'}>
                    <p className={"important-text"}>Vul onderstaand formulier in om een product toe te voegen</p>
                    <p className={'small-text'}>Alle velden zijn verplicht.</p>
                </ContentContainer>

                <ContentContainer id={'dashboard-container'}>
                    <p className={"form-text"}>Product-type:</p>
                </ContentContainer>

            </div>
        </Page>
    );
}

export default ProductAdd;
