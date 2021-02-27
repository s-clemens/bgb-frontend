import React from 'react';
import "./Signup.css";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Page from "../../Components/Page";
import Pagetitle from "../../Components/pagetitile/Pagetitle";
import LineBreak from "../../Components/LineBreak/LineBreak";
import ContentContainer from "../../Components/contentcontainer/ContentContainer";
import letsPlay from "../../images/monopoly.jpeg"
import ErrorMessage from "./errorMessage";

const endpointLink = 'http://localhost:8080/api/auth/signup'

function Signup() {

    const { handleSubmit, register, errors, setError, clearError} = useForm();
    const [createSucces, setCreateSucces] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    async function onFormSubmit(data){
        console.log(data)
        toggleLoading(true)
        setSubmitError('')
        try {
            const response = await axios.post(endpointLink, {
                username: data.username,
                email: data.email,
                password: data.password,
                phonenumber: data.phonenumber,
            });
            console.log("De volgende data is verstuurd:")
            console.log(response.data)

            {response.data && setCreateSucces(true)}
        } catch(e){
            console.log(e);
            setCreateSucces(false)
            if (e.message.includes('400')) {
                setSubmitError('Er bestaat al een account met deze username.')
            } else {
                setSubmitError('Er is iets misgegeaan bij het verzenden. Probeer het opnieuw.')
            }
        }
        toggleLoading(false);
    }

    return (
        <Page>
        <div className="page-container">

            <Pagetitle>AANMELDEN</Pagetitle>
            <LineBreak width={'80%'} color={'black'} >""</LineBreak>

            <ContentContainer id={'signup-container'}>

                <div className={'signup-container-part1'}>

                    <p className={'important-text'}>Vul uw gegevens in om een account aan te maken.</p>
                    <p className={'small-text'}>Heeft u al een account?<br/>
                        Klik dan <Link exact to="/sign-in">HIER</Link> om een account aan te maken.</p>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <fieldset>
                        <label htmlFor="details-email">
                            E-mail:<br/>
                            <input type="text" name="email" id="details-email" ref={register({
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                }})}/>
                            <ErrorMessage error={errors.email}/>
                        </label>
                        <br/>
                        <label htmlFor="details-username">
                            Gebruikersnaam:<br/>
                            <input type="text" name="username" id="details-username"
                                   ref={register({required: true})}/>
                            <ErrorMessage error={errors.username}/>
                        </label>
                        <br/>
                        <label htmlFor="details-phonenumber">
                            Telefoon nummer:<br/>
                            <input type="text" name="phonenumber" id="details-phonenumber"
                                   ref={register({required: true, minLength: 10})}/>
                            <ErrorMessage error={errors.phonenumber}/>
                        </label>
                        <br/>
                        <label htmlFor="details-password">
                            Wachtwoord:<br/>
                            <input type="password" name="password" id="details-password"
                                   ref={register({required: true, minLength: {
                                           value: 8,
                                           message: "Password must have at least 8 characters"
                                       }})}/>
                            <ErrorMessage error={errors.password}/>
                        </label>
                        <br/>
                        <button type="submit" disabled={loading}>{loading ? 'loading...': 'Maak account aan.'}</button>
                        { createSucces === true  &&
                        <p> Het is gelukt! Je kunt <Link to="/sign-in">hier</Link> inloggen!</p>}
                        { submitError && <p className={'error-form-text'}>{submitError}</p>}
                    </fieldset>
                </form>
                </div>

                <div className={'signup-container-part2'}>
                    <img id={'letsplay-image'} src={letsPlay}/>
                </div>

            </ContentContainer>
        </div>
        </Page>
    );
}

export default Signup;