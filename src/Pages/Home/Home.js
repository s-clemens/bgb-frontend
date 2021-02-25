import React from 'react';
import Page from "../../Components/Page";
import Pagetitle from "../../Components/pagetitile/Pagetitle"
import LineBreak from "../../Components/LineBreak/LineBreak";

function Home() {

    return (
        <Page>
            <div className="page-container">
                <Pagetitle>BOARDGAME BUNKER</Pagetitle>
                <LineBreak height={'5px'} width={'80%'} color={'black'} >""</LineBreak>
            </div>
        </Page>
    );
}

export default Home;
