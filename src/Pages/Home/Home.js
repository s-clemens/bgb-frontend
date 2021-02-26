import React from 'react';
import Page from "../../Components/Page";
import Pagetitle from "../../Components/pagetitile/Pagetitle"
import LineBreak from "../../Components/LineBreak/LineBreak";
import Image from "../../Components/Image/Image";
import foto from "../../images/Couple at a table-edited.jpg"


function Home() {

    return (
        <Page>
            <div className="page-container">
                <Pagetitle>BOARDGAME BUNKER</Pagetitle>
                <LineBreak height={'5px'} width={'80%'} color={'black'} >""</LineBreak>
                <Image src={foto} borderradius={'15px'} />
            </div>
        </Page>
    );
}

export default Home;
