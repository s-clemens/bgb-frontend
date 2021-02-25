// We willen in de context bijhouden of we op dit moment:
// Gebruikersdata hebben
// en of de gebruiker geautoriseerd is om data te mogen bekijken.

import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";

const AuthContext = createContext({})

function AuthContextProvider({ children }) {

    const [authState, setAuthState] = useState({
        status: 'pending',
        error: null,
        user: null,
    })

    // useEffect( () => {
    //     // Haal uit de local storage de JWT Token
    //     const token = localStorage.getItem('token')
    //     // Als die er niet is kunnen we gewoon verder
    //     // Als die er wel is dan betekent dat de applicatie herstart is
    //     // En dan willen we nog even onze gebruikersdata (username, etc) ophalen.
    //     setTimeout(() => {
    //         // er is geen token, dus we beginnen met een schone lei!
    //         setAuthState({
    //             ...authState,
    //             status: 'done',
    //         })
    //     }, 2000)
    // }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');

        async function getUserInfo() {
            try {
                console.log("banaan")
                console.log(token)
                // We kunnen de gebruikersdata ophalen omdat we onszelf authenticeren met de token
                const response = await axios.get('http://localhost:8080/api/auth/token-check', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("banaan2")

                console.log(response);

                // met het resultaat vullen we de context
                setAuthState({
                    ...authState,
                    user: {
                        id: response.id,
                        username: response.username,
                        email: response.email,
                    },
                    status: 'done',
                });

            } catch (e) {
                // Gaat er toch iets mis? Dan zetten we de error in de context
                setAuthState({
                    ...authState,
                    user: null,
                    error: e,
                    status: 'done'
                });
            }
        }

        // als we GEEM userinformatie meer in de applicatie hebben, maar er staat WEL een token in
        // local storage, gaan we handmatig de gebuikersdata ophalen door de getUserInfo functie van hierboven aan te roepen
        if (authState.user === null && token) {
            getUserInfo();
        } else {
            // Als er geen ingelogde gebruiker hoeft te zijn, zetten we de context naar de basis state
            setAuthState({
                ...authState,
                error: null,
                user: null,
                status: 'done'
            });
        }
    }, []);


    // de token willen we in de local storage zetten
    function login(data) {
        console.log(data)
        localStorage.setItem('token', data.accessToken)

        // de user-info willen we in de context zetten
        setAuthState({
            ...authState,
            user: {
                username: data.username,
                email: data.email,
                roles: data.roles,
            }
        })

    }

    function logout(){
        // 1. Maak local storage leeg
        localStorage.clear();
        // 2. Haal de user uit de context-state.
        setAuthState({
            ...authState,
            user: null,
        })

    }

    // De ... zorgt ervoor dat hij gaat kijken naar wat authState is, als je dit niet doet overschrijft hij de data
    const providerData = {
        ...authState,
        login,
        logout,
        // logout, (functie zit er nog niet in)
    }

    return(
        // Checkt of de Autstate done of pending is, als done dan laat hij de app zien, anders loading..
        <AuthContext.Provider value={providerData}>
            {authState.status === 'done' && children}
            {authState.status === 'pending' && <p>Loading..</p>}
        </AuthContext.Provider>
    );
}

function useAuthState(){
    const authState = useContext(AuthContext);
    // Iemand is geauthoriseerd wanneer de status === 'done'
    // En als er een gebruiker in de authState staat
    const isDone = authState.status === 'done';
    const isAuthenticated = authState.user !== null && isDone;
    console.log('Ik ben Authenticated:', isAuthenticated);

    return{
        ...authState,
        isAuthenticated: isAuthenticated,
    }
}

// Exports so it can be imported by other files
export {
    AuthContext,
    useAuthState,
    AuthContextProvider
}
