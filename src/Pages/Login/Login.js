import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import {AuthContext, useAuthState} from "../../context/AuthContext";
import { useHistory } from 'react-router-dom';
import Page from "../../Components/Page";
import Pagetitle from "../../Components/pagetitile/Pagetitle";
import LineBreak from "../../Components/LineBreak/LineBreak";
import ContentContainer from "../../Components/contentcontainer/ContentContainer";
import Image from "../../Components/Image/Image";
import shield from "../../images/icons/shield-alt-solid.svg"
import "./Login.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ErrorMessage from "../Signup/errorMessage";

const endpointLink = 'http://localhost:8080/api/auth/signin'

function Login() {
    const { login } = useContext(AuthContext)
    const { isAuthenticated, isAdmin } = useAuthState()
    const [submitError, setSubmitError] = useState('');
    const history = useHistory();
    const { handleSubmit, register, errors, setError, clearError} = useForm();

    useEffect(() => {
        if (isAuthenticated === true)
        {
            history.push('/profile')
        }
    }, [isAuthenticated, history]);

    async function onFormSubmit(data) {
        console.log(data);
        try {
            const response = await axios.post(endpointLink, {
                username: data.username,
                password: data.password })

            login(response.data);
            console.log(response)
        } catch(e){
            if (e.message.includes('401')) {
                setSubmitError('Toegang geweigerd. Controleer uw gegevens.')
            } else {
                setSubmitError('Er is iets misgegeaan bij het verzenden. Probeer het opnieuw.')
            }
        }
    }

    return (
        <Page>
            <div className="page-container">
                <Pagetitle>INLOGGEN</Pagetitle>
                <LineBreak width={'80%'} color={'black'} >""</LineBreak>

                <ContentContainer id={'login-container'}>

                    <div className='container-split'>
                    <p className={'important-text'}>Vul uw gegevens in om in te loggen.</p>
                    <p className={'small-text'}>Nog geen account? <br/>
                        Klik dan <Link exact to="/sign-up">HIER</Link> om een account aan te maken.</p>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <fieldset>

                            <label className={'text-entry'} htmlFor="details-username">
                                Gebruikersnaam:<br/>
                                <input type="text" name="username" id="details-username" ref={register({required: true})}/>
                                <ErrorMessage error={errors.username}/>
                            </label>
                            <br/>

                            <label className={'text-entry'} htmlFor="details-password">
                                Wachtwoord:<br/>
                                <input type="password" name="password" id="details-password" ref={register({required: true})}/>
                                <ErrorMessage error={errors.password}/>
                            </label>
                            <br/>


                            <button type="submit">Log in</button>
                            {submitError && <p className={'error-form-text'}>{submitError}</p>}
                        </fieldset>
                    </form>
                    </div>

                    <div className='container-split'>
                        <Image banaan={'login-image-container'} id={'shield-svg'} src={shield} borderradius={'15px'}/>
                    </div>

                </ContentContainer>
            </div>
        </Page>
    );
}

export default Login;