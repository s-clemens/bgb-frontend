import React from 'react';
import {NavLink} from "react-router-dom";
import {useAuthState } from "../context/AuthContext";
import logo from '../images/logos/BGB_White.png';
import "./TopMenu.css";

function TopMenu() {

    const { isAuthenticated, user } = useAuthState();

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
                                    <NavLink activeStyle={{textDecoration: 'underline'}} exact to="/">
                                        HOME
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink activeStyle={{textDecoration: 'underline'}} exact to="/sign-up">
                                        RESERVEREN
                                    </NavLink>
                                </li>

                                <li>
                                <NavLink activeStyle={{textDecoration: 'underline'}} exact to="/offer">
                                    AANBOD
                                </NavLink>
                                </li>
                                {isAuthenticated ?
                                    (<li>
                                        <NavLink activeStyle={{textDecoration: 'underline'}} exact to="/profile">
                                            DASHBOARD
                                        </NavLink>
                                    </li>)
                                    : (
                                    <li>
                                        <NavLink  exact to="/sign-in">
                                            INLOGGEN
                                        </NavLink>
                                    </li>)
                                }
                            </ul>
                    </div>
                <div className="nav-container4">
                </div>
            </div>
            </nav>
        </>
    );
}

export default TopMenu;