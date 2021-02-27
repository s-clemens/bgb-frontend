import React, {useContext} from 'react';
import "./DashboardItem.css";
import {NavLink} from "react-router-dom";

const DashboardItem = ({name, path, icon}) => {

    return(
        <>
            <NavLink to={path}>
                <div className={'dashboard-item'}>
                    <div className={'dashboard-item-icon'}>
                        <img src={icon}/>
                    </div>
                    <div className={'dashboard-item-name'}>
                        <p>{name}</p>
                    </div>
                </div>
            </NavLink>
        </>
    )
}

export default DashboardItem;