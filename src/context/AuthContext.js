import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios"

const AuthContext = createContext({})

function AuthContextProvider({ children }) {

    const [authState, setAuthState] = useState({
        status: 'pending',
        error: null,
        user: null,
    })

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
            }
        })
    }

    function logout(){
        localStorage.clear();
        setAuthState({
            ...authState,
            user: null,
        })
    }

    const providerData = {
        ...authState,
        login,
        logout,
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
    let isAdmin = false;

    if (authState.user !== null){
        for (let i = 0; i < authState.user.roles.length; i++) {
            if (authState.user.roles[i] === "ROLE_ADMIN"){
                isAdmin = true;
            }
        }
        if (authState.user.roles[1] === "ROLE_ADMIN"){
            isAdmin = true;
        }
    }

    return{
        ...authState,
        isAuthenticated: isAuthenticated,
        isAdmin: isAdmin,
    }
}

export {
    AuthContext,
    useAuthState,
    AuthContextProvider
}