import {useAuthState} from "../../context/AuthContext";
import Page from "../../Components/Page";
import Pagetitle from "../../Components/pagetitile/Pagetitle";
import LineBreak from "../../Components/LineBreak/LineBreak";
import ContentContainer from "../../Components/contentcontainer/ContentContainer";
import React from 'react';
import { Link } from 'react-router-dom';
import ItemContainer from "../../Components/itemcontainer/ItemContainer";
import BoardgameList from "../../Components/BoardgameList/BoardgameList";
import ConsumableList from "../../Components/consumablelist/ConsumableList";

function Offer() {

    return(
        <Page>
            <div className={'page-container'}>

                <Pagetitle>AANBOD</Pagetitle>
                <LineBreak width={'80%'} color={'black'} >""</LineBreak>

                <ContentContainer id={'offer-container'}>
                    <p className={"important-text"}>
                        Bekijk onderstaand al het leuks en lekkers dat wij mogen aanbieden zodra wij weer open mogen!
                    </p>
                    <p className={'small-text'}>
                        Vergeet je niet alvast aan te melden zodat we jou een bericht kunnen sturen zodra wij u weer
                        mogen ontvangen. <br/>
                        Dat doe je door <Link to={'/sign-up'}>HIER</Link> te klikken.
                    </p>
                </ContentContainer>

                <ContentContainer id={'offer-container'}>
                    <p className={"important-text"}>
                        Boardgames
                    </p>
                    <ItemContainer id={'offer-item-boardgame-container'}>
                        <BoardgameList/>
                    </ItemContainer>
                </ContentContainer>

                <ContentContainer id={'offer-container'}>
                    <p className={"important-text"}>
                        Hapjes en drankjes
                    </p>
                    <ItemContainer id={'offer-item-consumable-container'}>
                        <ConsumableList/>
                    </ItemContainer>
                </ContentContainer>

            </div>
        </Page>
    )
}

export default Offer;