import './App.css';
import { Redirect, Switch, Route,} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Signup from './Pages/Signup/Signup';
import TopMenu from "./Components/TopMenu";
import {useAuthState} from "./context/AuthContext";
import ProductAdd from "./Pages/ProductAdd/ProductAdd";

// Methode voor private route als de gebruiker vaker gecheckt moet worden.
function PrivateRoute({ children, ...rest}) {
    const { isAuthenticated } = useAuthState();

    return (
        <Route { ...rest } render={() => {
        return isAuthenticated ? children : <Redirect to="/sign-in"/>
        }}/>
    );
}

function AdminRoute({ children, ...rest}) {
    const { isAdmin } = useAuthState();

    return (
        <Route { ...rest } render={() => {
            return isAdmin ? children : <Redirect to="/"/>
        }}/>
    );
}


function App() {

    const { isAuthenticated } = useAuthState();


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
            <AdminRoute exact path="/add-product">
                <ProductAdd />
            </AdminRoute>
            <PrivateRoute exact path="/profile">
                <Profile />
            </PrivateRoute>
            <Route path="/sign-up">
                <Signup />
            </Route>
          </Switch>
      </>
  );
}

export default App;
