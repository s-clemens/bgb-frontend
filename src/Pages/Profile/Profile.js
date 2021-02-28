import React, {useContext} from 'react';
import {AuthContext, useAuthState} from "../../context/AuthContext";
import Page from "../../Components/Page";
import Pagetitle from "../../Components/pagetitile/Pagetitle";
import LineBreak from "../../Components/LineBreak/LineBreak";
import ContentContainer from "../../Components/contentcontainer/ContentContainer";
import ItemContainer from "../../Components/itemcontainer/ItemContainer";
import DashboardItem from "../../Components/dashboarditem/DashboardItem";
import productIcon from "../../images/icons/p-icon.svg";
import calendarIcon from "../../images/icons/calendar icon.svg";
import calendarAddIcon from "../../images/icons/calendar-add-icon.svg";
import calendarCancelIcon from "../../images/icons/calendar-cancel-icon.svg";
import covidIcon from "../../images/icons/thermometer-icon.svg";
import phoneIcon from "../../images/icons/phone-icon.svg";
import bookIcon from "../../images/icons/reader-icon.svg";
import "./Profile.css";

function Profile() {
    const { user } = useAuthState()
    const { logout, getAdmin } = useContext(AuthContext)

    return (
        <Page>
            <div className="page-container">
                <Pagetitle>DASHBOARD</Pagetitle>
                <LineBreak width={'80%'} color={'black'} >""</LineBreak>

                <ContentContainer id={'dashboard-container'}>
                    <div className={'dashboard-top-box1'}>
                        <div className={'dashboard-top-box2'}>
                            <p className={"important-text"}>Welkom {user.username}, op je persoonlijke dashboard.</p>
                            <p className={'small-text'}>Selecteer een van de onderstaande opties om verder te gaan.<br/>
                            Vanwege de verplichte sluiting vanwege COVID-19 kan het zijn dat sommige functies niet werken.
                            </p>
                        </div>

                        <div className={'dashboard-top-box3'}>
                            <button onClick={logout}>Uitloggen</button>
                        </div>
                    </div>

                    <ItemContainer id={'dashboard-item-container'}>

                        {/*If auth received used is admin then show:*/}
                        {getAdmin() ? (<DashboardItem icon={productIcon} name={'PRODUCT TOEVOEGEN'} path={'/add-product'}/>)
                            : (<span/>)}
                        {getAdmin() ? (<DashboardItem icon={productIcon} name={'PRODUCT UPDATEN'} path={'/'}/>)
                            : (<span/>)}
                        {getAdmin() ? (<DashboardItem icon={covidIcon} name={'COVID MAATREGELEN'} path={'/'}/>)
                            : (<span/>)}
                        {getAdmin() ? (<DashboardItem icon={calendarIcon} name={'BOOKINGEN BEKIJKEN'} path={'/'}/>)
                            : (<span/>)}
                        {getAdmin() ? (<DashboardItem icon={calendarCancelIcon} name={'BOOKING ANNULEREN'} path={'/'}/>)
                            : (<span/>)}
                        {getAdmin() ? (<DashboardItem icon={bookIcon} name={'GASTENLIJSTEN'} path={'/'}/>)
                            : (<span/>)}

                        {/*If auth recevied user is user then show:*/}
                        {!getAdmin() ? (<DashboardItem icon={calendarAddIcon} name={'BOOKING MAKEN'} path={'/'}/>)
                            : (<span/>)}
                        {!getAdmin() ? (<DashboardItem icon={calendarIcon} name={'BOOKING BEKIJKEN'} path={'/'}/>)
                            : (<span/>)}
                        {!getAdmin() ? (<DashboardItem icon={phoneIcon} name={'CONTACT'} path={'/'}/>)
                            : (<span/>)}

                    </ItemContainer>
                </ContentContainer>

            </div>
        </Page>
    );
}

export default Profile;