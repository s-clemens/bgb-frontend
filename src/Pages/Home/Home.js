import React from 'react';
import Page from "../../Components/Page";
import Pagetitle from "../../Components/pagetitile/Pagetitle"
import LineBreak from "../../Components/LineBreak/LineBreak";
import Image from "../../Components/Image/Image";
import foto from "../../images/Couple at a table-edited.jpg"
import ContentContainer from "../../Components/contentcontainer/ContentContainer"
import {NavLink} from "react-router-dom";

function Home() {

    return (
        <Page>
            <div className="page-container">
                <Pagetitle>BOARDGAME BUNKER</Pagetitle>
                <LineBreak width={'80%'} color={'black'} >""</LineBreak>
                <Image banaan={'home-image-container'} id={'image-couple-playing'} src={foto} borderradius={'15px'} />
                <ContentContainer id={'homepage-tekst'}>
                    <p>
                        Welkom bij de Boardgame Bunker, lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vitae eros massa. Nam at vulputate sem. Sed consectetur ultricies sagittis.
                        Integer dapibus et dolor vel tincidunt. Donec imperdiet imperdiet commodo.
                        Pellentesque tristique ultrices nulla eget placerat. Nunc tristique ultrices pharetra.
                        Nulla facilisi. Maecenas lobortis porta leo sed viverra. Curabitur elementum dui eros,
                        vehicula condimentum est laoreet sed. Sed mollis pellentesque varius.
                        <br/>
                        <br/>
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse vitae eros massa. Nam at vulputate sem. Sed consectetur ultricies sagittis.
                        Integer dapibus et dolor vel tincidunt. Donec imperdiet imperdiet commodo.
                        Pellentesque tristique ultrices nulla eget placerat. Nunc tristique ultrices pharetra.
                        Nulla facilisi. Maecenas lobortis porta leo sed viverra. Curabitur elementum dui eros,
                        vehicula condimentum est laoreet sed. Sed mollis pellentesque varius.

                    </p>
                    <br/>
                    <p>
                        Helaas is het zo dat we gedurende de huidige COVID-19 maatregelen geen reserveringen aan mogen
                        nemen. <br/>Je kunt wel in de tussentijd een kijkje nemen naar ons aanbod voor als we weer open
                        mogen! <br/>Klik daarvoor <NavLink to={"/offer"}>HIER</NavLink>.
                    </p>
                </ContentContainer>
            </div>
        </Page>
    );
}

export default Home;