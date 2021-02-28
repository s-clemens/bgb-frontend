import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios"

const AuthContext = createContext({})


function AuthContextProvider({ children }) {

    // const { user, isAdmin } = useAuthState()

    const [authState, setAuthState] = useState({
        status: 'pending',
        error: null,
        user: null,
    })
    const [admin, setAdmin ] = useState(false);


    useEffect(() => {

        const token = localStorage.getItem('token');
        async function getUserInfo() {

            try {
                const response = await axios.get('http://localhost:8080/api/auth/token-check', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response)

                setAuthState({
                    ...authState,
                    user: {
                        id: response.data.id,
                        username: response.data.username,
                        email: response.data.email,
                        roles: response.data.roles
                    },
                    status: 'done',
                });

            } catch (e) {
                setAuthState({
                    ...authState,
                    user: null,
                    error: e,
                    status: 'done'
                });
            }
        }

        if (authState.user === null && token) {
            getUserInfo();
        } else {
            setAuthState({
                ...authState,
                error: null,
                user: null,
                status: 'done'
            });
        }
    }, []);

    function login(data) {
        localStorage.setItem('token', data.accessToken)

        setAuthState({
            ...authState,
            user: {
                username: data.username,
                email: data.email,
                roles: data.roles,
            },
        })
        isAdmin(data.roles);
    }

    function logout(){
        localStorage.clear();
        setAuthState({
            ...authState,
            user: null,
        })
        setAdmin(false);
    }

    function isAdmin(data){
        if ( data[0].includes("ROLE_ADMIN")) {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    }

    function getAdmin() {
        return admin;
    }

    const providerData = {
        ...authState,
        login,
        logout,
        getAdmin
    }

    return(
        <AuthContext.Provider value={providerData}>
            {authState.status === 'done' && children}
            {authState.status === 'pending' && <p>Loading..</p>}
        </AuthContext.Provider>
    );
}

function useAuthState(){
    const authState = useContext(AuthContext);
    const isDone = authState.status === 'done';
    const isAuthenticated = authState.user !== null && isDone;

    return{
        ...authState,
        isAuthenticated: isAuthenticated,
    }
}

export {
    AuthContext,
    useAuthState,
    AuthContextProvider
}