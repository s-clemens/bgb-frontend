import React from 'react';
import {useAuthState} from "../../context/AuthContext";
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
import logoutIcon from "../../images/icons/signout-icon.svg";
import phoneIcon from "../../images/icons/phone-icon.svg";
import bookIcon from "../../images/icons/reader-icon.svg";


function Profile() {

    const { user, isAdmin } = useAuthState()

    return (
        <Page>
            <div className="page-container">
                <Pagetitle>DASHBOARD</Pagetitle>
                <LineBreak width={'80%'} color={'black'} >""</LineBreak>

                <ContentContainer id={'dashboard-container'}>
                    <p className={"important-text"}>Welkom {user.username}, op je persoonlijke dashboard.</p>
                    <p className={'small-text'}>Selecteer een van de onderstaande opties om verder te gaan.</p>
                    <ItemContainer id={'dashboard-item-container'}>

                        {/*If auth received used is admin then show:*/}
                        {isAdmin ? (<DashboardItem icon={productIcon} name={'PRODUCT TOEVOEGEN'} path={'/add-product'}/>)
                            : (<span/>)}
                        {isAdmin ? (<DashboardItem icon={productIcon} name={'PRODUCT UPDATEN'} path={'/'}/>)
                            : (<span/>)}
                        {isAdmin ? (<DashboardItem icon={covidIcon} name={'COVID MAATREGELEN'} path={'/'}/>)
                            : (<span/>)}
                        {isAdmin ? (<DashboardItem icon={calendarIcon} name={'BOOKINGEN BEKIJKEN'} path={'/'}/>)
                            : (<span/>)}
                        {isAdmin ? (<DashboardItem icon={calendarCancelIcon} name={'BOOKING ANNULEREN'} path={'/'}/>)
                            : (<span/>)}
                        {isAdmin ? (<DashboardItem icon={bookIcon} name={'GASTENLIJSTEN'} path={'/'}/>)
                            : (<span/>)}

                        {/*If auth recevied user is user then show:*/}
                        {!isAdmin ? (<DashboardItem icon={calendarAddIcon} name={'BOOKING MAKEN'} path={'/'}/>)
                            : (<span/>)}
                        {!isAdmin ? (<DashboardItem icon={calendarIcon} name={'BOOKING BEKIJKEN'} path={'/'}/>)
                            : (<span/>)}
                        {!isAdmin ? (<DashboardItem icon={phoneIcon} name={'CONTACT'} path={'/'}/>)
                            : (<span/>)}

                        {/* Available to everyone*/}
                        <DashboardItem icon={logoutIcon} name={'UITLOGGEN'} path={'/'}/>


                    </ItemContainer>
                </ContentContainer>

            </div>
        </Page>
    );
}

export default Profile;
