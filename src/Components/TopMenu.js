import React from 'react';
import {NavLink} from "react-router-dom";
import {AuthContext, useAuthState } from "../context/AuthContext";
import { useContext } from 'react';
import logo from '../images/logos/BGB_White.png';
import "./TopMenu.css";

function TopMenu() {

    // context dingen
    const { isAuthenticated, user } = useAuthState();
    const { logout } = useContext(AuthContext)

    return (
        <>
            <nav>
            <div className="nav-container1">
                <div className="nav-container2">
                    <img src={logo} height={"50px"} alt={"bgb white logo"}/>
                </div>
                    <div className="nav-container3">
                            <ul>
                                <li>
                                    <NavLink activeStyle={{textDecoration: 'underline'}} exact to="/">HOME</NavLink>
                                </li>

                                <li>
                                    <NavLink activeStyle={{textDecoration: 'underline'}} exact to="/sign-up">RESERVEREN</NavLink>
                                </li>

                                <li>
                                <NavLink activeStyle={{textDecoration: 'underline'}} exact to="/">AANBOD</NavLink>
                                </li>
                                {isAuthenticated ?
                                    (<li>
                                        <NavLink activeStyle={{textDecoration: 'underline'}} exact to="/profile">DASHBOARD</NavLink>
                                    </li>)
                                    : (
                                    <li>
                                        <NavLink  exact to="/sign-in">INLOGGEN</NavLink>
                                    </li>)
                                }

                            </ul>
                    </div>
                <div className="nav-container4">
                    {isAuthenticated ?
                        (<NavLink exact to="/Profile">Logged in as: {user.username}</NavLink>)
                    :
                        (<p> test </p>)}
                </div>
            </div>
            </nav>
        </>
    );
}

export default TopMenu;
