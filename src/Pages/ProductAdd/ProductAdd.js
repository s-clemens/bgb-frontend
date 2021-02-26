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
const endpointlink = `http://localhost:8080/api/product/${producttype}`



function ProductAdd() {


    const { user, isAdmin } = useAuthState()

    const { handleSubmit, register, errors, setError, clearError} = useForm();

    // State voor gebruikers-feedback
    const [createSucces, setCreateSucces] = useState(false);
    // Zorgt voor state waarin we button value e.d. kunnen aanpassen op state.
    const [loading, toggleLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const [productTypeSelection, setProductTypeSelection] = useState('');

    const [coverImageString, setCoverImageString] = useState();

    async function handleUpload(e){
        const file = e.target.files[0];
        const MYSTRING = await convertBase64(file)
        setCoverImageString(MYSTRING);
        console.log(MYSTRING);
    }



    function handleChange(e) {
        setProductTypeSelection(e.target.value)
        console.log(productTypeSelection);
    }

    // Als form wordt submit:
    async function onFormSubmit(data){
        console.log(data);
        toggleLoading(true);
        setSubmitError('')
        if (productTypeSelection === 'BOARD_GAME'){
            producttype = 'postboardgame'
        }
        if (productTypeSelection === 'CONSUMABLES'){
            producttype = 'postconsumable'
        }
        try {

            const token = localStorage.getItem('token');
            console.log(token)
            const response = await axios.post(endpointlink + producttype,{
                    name: data.name,
                    producttype: data.producttype,
                    price: data.price,
                    ingredients: data.ingredients,
                    consumabletype: data.consumabletype,
                    coverimage: coverImageString,

                    description: data.description,
                    boardgametype: data.boardgametype,
                    minplayers: data.minplayers,
                    maxplayers: data.maxplayers,
                    totalstock: data.totalstock
            },
                {

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
                );
            console.log("de volgende data is verstuurd:")
            console.log(response.data);
            {response.data && setCreateSucces(true)}
        } catch(e) {
            console.log(e);
            if (e.message.includes('400')) {
                setSubmitError('Er bestaat al een account met deze username.')
            } else {
                setSubmitError('Er is iets misgegeaan bij het verzenden. Probeer het opnieuw.')
            }
        }
        toggleLoading(false);
    }

    const convertBase64 = (file) => {

        return new Promise((resolve, reject) => {

            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = (() => {

                resolve(fileReader.result);

            });
            fileReader.onerror = ((error) => {
                reject(error);
            });
        });
    }

    return (
        <Page>
            <div className="page-container">
                <Pagetitle>PRODUCT TOEVOEGEN</Pagetitle>
                <LineBreak width={'80%'} color={'black'} >""</LineBreak>

                <ContentContainer id={'dashboard-container'}>
                    <p className={"important-text"}>Vul onderstaand formulier in om een product toe te voegen</p>
                    <p className={'small-text'}>Alle velden zijn verplicht.</p>
                </ContentContainer>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <fieldset>

                    <ContentContainer id={'dashboard-container'}>
                        <p className={'text-entry'}>Product informatie:</p>

                        <label className={'text-entry'} htmlFor="details-name">
                            Naam:<br/>
                            <input type="text" name="name" id="details-name" ref={register({required: true, minLength: 2})}/>
                            <ErrorMessage error={errors.name}/>
                        </label>

                        <label className={'text-entry'}>Producttype:</label>
                        <select className={'text-entry'}name="producttype" ref={register({ required: true })} onChange={handleChange}>
                            <option value="">Select...</option>
                            <option value="BOARD_GAME">Boardgame</option>
                            <option value="CONSUMABLES">Etenswaren</option>
                        </select>
                        <ErrorMessage error={errors.gender} />



                        <label id={'text-entry'} htmlFor="details-file">
                            Afbeelding:<br/>
                            <input type="file" name="file" id="details-file" ref={register({required: true})}
                                   onChange={handleUpload}/>
                            <ErrorMessage error={errors.file}/>
                        </label>

                        <label className={'text-entry'} htmlFor="details-price">
                            Prijs:<br/>
                            <input type="number" step='0.01' name="price" id="details-price" ref={register({required: true})}/>
                            <ErrorMessage error={errors.price}/>
                        </label>

                    </ContentContainer>

                    {productTypeSelection === 'BOARD_GAME' ?
                        (
                            <ContentContainer id={'dashboard-container'}>
                                <p className={"form-text"}>Boardgame informatie:</p>

                                <label className={'text-entry'} htmlFor="details-description">
                                    Beschrijving:<br/>
                                    <textarea type="textarea" name="description" id="details-description" ref={register({required: true, maxLength: 50})}/>
                                    <ErrorMessage error={errors.description}/>
                                </label>

                                <label>Spel duur:</label>
                                <select name="boardgametype" ref={register({ required: true })}>
                                    <option value="">Select...</option>
                                    <option value="THIRTY_MINUTES">30 minuten</option>
                                    <option value="ONE_HOUR">1 uur</option>
                                    <option value="TWO_HOURS">2 uur</option>
                                </select>
                                <ErrorMessage error={errors.producttype} />

                                <label className={'text-entry'} htmlFor="details-minplayers">
                                    Minimaal aantal spelers:<br/>
                                    <input type="number" name="minplayers" id="details-minplayers" ref={register({required: true})}/>
                                    <ErrorMessage error={errors.minplayers}/>
                                </label>

                                <label className={'text-entry'} htmlFor="details-maxplayers">
                                    Maximaal aantal spelers:<br/>
                                    <input type="number" name="maxplayers" id="details-maxplayers" ref={register({required: true})}/>
                                    <ErrorMessage error={errors.maxplayers}/>
                                </label>

                                <label className={'text-entry'} htmlFor="details-totalstock">
                                    Totaal op voorraad:<br/>
                                    <input type="number" name="totalstock " id="details-totalstock" ref={register({required: true})}/>
                                    <ErrorMessage error={errors.maxplayers}/>
                                </label>

                                <button type="submit">Log in</button>
                                {submitError && <p className={'error-form-text'}>{submitError}</p>}

                            </ContentContainer>

                        ) : productTypeSelection === 'CONSUMABLES' ? (

                            <ContentContainer id={'dashboard-container'}>
                                <p className={"form-text"}>Etenswaren informatie:</p>
                                <label className={'text-entry'} htmlFor="details-ingredients">
                                    Beschrijving:<br/>
                                    <textarea type="textarea" name="ingredients" id="details-ingredients" ref={register({required: true, maxLength: 50})}/>
                                    <ErrorMessage error={errors.ingredients}/>
                                </label>

                                <label>Type:</label>
                                <select name="consumabletype" ref={register({ required: true })}>
                                    <option value="">Select...</option>
                                    <option value="FOOD">Eten</option>
                                    <option value="DRINKS">Drinken</option>
                                </select>
                                <ErrorMessage error={errors.consumabletype} />

                                <button type="submit">Log in</button>
                                {submitError && <p className={'error-form-text'}>{submitError}</p>}






                            </ContentContainer>









                        ) : (<span></span>)}










                            <ContentContainer id={'dashboard-container'}>


                    </ContentContainer>



                    </fieldset>
                </form>
            </div>
        </Page>
    );
}

export default ProductAdd;
