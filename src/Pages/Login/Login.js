import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import {AuthContext, useAuthState} from "../../context/AuthContext";
import { useHistory } from 'react-router-dom';
import Page from "../../Components/Page";


const endpointLink = 'http://localhost:8080/api/auth/signin'

function Login() {
    // Overname login en isAuthenticated functie overname
    const { login } = useContext(AuthContext)
    const { isAuthenticated } = useAuthState()

    // Om gebruik te maken van history en naar de profielpagina te pushten
    const history = useHistory();

    // useForm syntax voor react hook form
    const { handleSubmit, register } = useForm();


    // Bekijkt of de authenticated true is, zoja, duwt deze pagina je door naar profile pagina
    useEffect(() => {
        if (isAuthenticated === true)
        {
            history.push('/profile')
        }
    }, [isAuthenticated, history]);


    // Zodra Form wordt submit gaat deze de info opvragen adhv username en password. Als dit klopt geeft het systeem de data terug.
    async function onFormSubmit(data) {
        console.log(data);
        try {
            const response = await axios.post(endpointLink, {
                // kan ook puur alleen data zijn. Maar omdat we react hook form gebruiken is dit de data zoals deze wordt aangeroepen op onformsubmit die uit React hook form komt.
                username: data.username,
                password: data.password })

            login(response.data);


            //Handel het inloggen aan de voorkant af ind e context met de data die we binnen hebben gekregen
            console.log(response)
        } catch(e){
            console.log(e);
        }
    }

    return (
        <Page>
            <div className="page-container">
                <h4>SIGN IN</h4>
                <hr/>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <fieldset>
                        <label htmlFor="details-username">
                            Username:<br/>
                            <input type="text" name="username" id="details-username" ref={register}/>
                        </label>
                        <br/>
                        <label htmlFor="details-password">
                            Password:<br/>
                            <input type="text" name="password" id="details-password" ref={register}/>
                        </label>
                        <br/>
                        <button type="submit">Submit Here</button>
                    </fieldset>
                </form>
            </div>
        </Page>
    );
}

export default Login;
