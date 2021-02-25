import './App.css';
import { Redirect, Switch, Route,} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Signup from './Pages/Signup/Signup';
import TopMenu from "./Components/TopMenu";
import {useAuthState} from "./context/AuthContext";

// Methode voor private route als de gebruiker vaker gecheckt moet worden.
function PrivateRoute({ children, ...rest}) {
    const { isAuthenticated } = useAuthState();

    return (
        <Route { ...rest } render={() => {
        return isAuthenticated ? children : <Redirect to="/sign-in"/>
        }}/>
    );
}


function App() {

    // const { isAuthenticated } = useAuthState();


  return (
      <>
          <TopMenu/>

          <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/sign-in">
                <Login />
            </Route>
            {/*<Route path="/profile">*/}
            {/*    /!*Als de gebruiker is ingelogd dan willen we profile laten zien*!/*/}
            {/*    /!*Als de gebruikers niet is ingelogd, dan willen we redirecten.*!/*/}
            {/*    { isAuthenticated ? (<Profile/>) : (<Redirect to="/sign-in"/>)}*/}
            {/*</Route>*/}
            <PrivateRoute exact path="/profile">
                <Profile/>
            </PrivateRoute>
            <Route path="/sign-up">
                <Signup />
            </Route>
          </Switch>
      </>
  );
}

export default App;
