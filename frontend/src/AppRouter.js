import React from "react";
import PageOne from "./components/PageOne";
import PageTwo from "./components/PageTwo";
import PageTree from "./components/PageTree";
import { Switch, Route, Redirect } from "react-router-dom";
import SignInSide from "./components/SignLnSide";
import { AuthContext } from "./Providers/AuthProvider";

export default function AppRouter() {
  return (
    <Switch>
      <Route exact path="/">
        <PageOne />
      </Route>
      <Route path="/pageTwo">
        <PageTwo />
      </Route>
      <Route path="/login">
        <SignInSide />
      </Route>
      <PrivateRoute path="/pageTree">
        <PageTree />
      </PrivateRoute>

      <Route path="*">
        <h1>404 Not Found</h1>
      </Route>
    </Switch>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
