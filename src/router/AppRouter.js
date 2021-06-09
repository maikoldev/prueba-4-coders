import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { AuthContext } from "../auth/AuthContext";
import { TransactionDetail } from "../pages/TransactionDetail";
import { LayoutApp } from "../layout/LayoutApp";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      component={(props) =>
        user.isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      component={(props) =>
        !user.isLogged ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

export const AppRouter = () => {
  return (
    <Router>
      <LayoutApp>
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/transaction/:id" component={TransactionDetail} />

          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </LayoutApp>
    </Router>
  );
};
