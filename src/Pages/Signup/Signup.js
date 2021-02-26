import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Page from "../../Components/Page";


const endpointLink = 'http://localhost:8080/api/auth/signup'

function Signup() {

    const { handleSubmit, register } = useForm();

    // State voor gebruikers-feedback
    const [createSucces, setCreateSucces] = useState(false);
    // Zorgt voor state waarin we button value e.d. kunnen aanpassen op state.
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    // Als form word submit, dan runt deze functie
    async function onFormSubmit(data){
        console.log(data)
        toggleLoading(true)
        setError('')
        try {
            const response = await axios.post(endpointLink, {
                username: data.username,
                email: data.email,
                password: data.password,
                phonenumber: data.phonenumber,
            });
            console.log("De volgende data is verstuurd:")
            console.log(response.data)
            // Als er een response is, dan op true zetten. Dit kan ook op succescode 200 gezetn worden.
            // eslint-disable-next-line no-lone-blocks
            {response.data && setCreateSucces(true)}
        } catch(e){
            console.log(e);
            if (e.message.includes('400')) {
                setError('Er bestaat al een account met deze username.')
            } else {
                setError('Er is iets misgegeaan bij het verzenden. Probeer het opnieuw.')
            }
        }
        // Try/Catch blok is klaar, toggleloading mag weer op false.
        toggleLoading(false);

    }

    // GEbruik de data uit het form om een gebruiker aan te maken
    // Kijk wat je terugkrijgt
    // Als het gelukt, willen we in dit component opslaan dat het gelukt is
    // ja sid sidsid / siddepot sidsid / sidsidsid sidsid
    // Als het gelukt wllen we een berichtje laten zien

    // HTML output
    return (
        <Page>
        <div className="page-container">
            <h4>SIGN UP</h4>
            <hr/>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <fieldset>
                    <label htmlFor="details-email">
                        E-mail:<br/>
                        <input type="text" name="email" id="details-email" ref={register}/>
                    </label>
                    <br/>
                    <label htmlFor="details-username">
                        Gebruikersnaam:<br/>
                        <input type="text" name="username" id="details-username" ref={register}/>
                    </label>
                    <br/>
                    <label htmlFor="details-phonenumber">
                        Telefoon nummer:<br/>
                        <input type="text" name="phonenumber" id="details-phonenumber" ref={register}/>
                    </label>
                    <br/>
                    <label htmlFor="details-password">
                        Wachtwoord:<br/>
                        <input type="text" name="password" id="details-password" ref={register}/>
                    </label>
                    <br/>
                    <button type="submit" disabled={loading}>{loading ? 'loading...': 'Maak account aan.'}</button>
                    { createSucces === true  && <p> Het is gelukt! Je kunt <Link to="/sign-in">hier</Link> inloggen!</p>}
                    { error && <p>{error}</p>}
                </fieldset>
            </form>
        </div>
        </Page>
    );
}

export default Signup;