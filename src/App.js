import './App.css';
import { Redirect, Switch, Route,} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Signup from './Pages/Signup/Signup';
import TopMenu from "./Components/TopMenu";
import {AuthContext, useAuthState} from "./context/AuthContext";
import ProductAdd from "./Pages/ProductAdd/ProductAdd";
import Offer from "./Pages/Offer/Offer";
import {useContext} from "react";

function PrivateRoute({ children, ...rest}) {
    const { isAuthenticated } = useAuthState();



    return (
        <Route { ...rest } render={() => {
        return isAuthenticated ? children : <Redirect to="/sign-in"/>
        }}/>
    );
}

function AdminRoute({ children, ...rest}) {
    const { getAdmin } = useContext(AuthContext)

    return (
        <Route { ...rest } render={() => {
            return getAdmin() ? children : <Redirect to="/"/>
        }}/>
    );
}

function App() {

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
              <Route path="/offer">
                  <Offer />
              </Route>
          </Switch>
      </>
  );
}

export default App;