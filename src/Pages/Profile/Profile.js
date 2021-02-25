import React from 'react';
import {useAuthState} from "../../context/AuthContext";
import Page from "../../Components/Page";


function Profile() {

    // Zorgt voor de data uit de userstate.
    const { user } = useAuthState()

    // Wil je beschermde data uitlezen?
    // Dan zet je hier weer een useEffect met lege [] dependency array
    // async function met try /catch
    // Maar in het request stuur je de token die in de localstorage staat, mee.

    return (
        <Page>
            <div className="page-container">
                <h4>PROFILE</h4>
                <hr/>
                <p>Gebruikersnaam:  {user.username} </p>
            </div>
        </Page>
    );
}

export default Profile;
