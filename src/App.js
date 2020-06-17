import React from "react";
import "assets/sass/styles.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from "pages/Layout";

function App() {
  localStorage.removeItem('currentTime')
  return (
      <BrowserRouter basename="/">
        <Switch>
          <Route
            name="Layout"
            exact
            path="/"
            render={(props) => <Layout {...props} />}
          />
          <Redirect exact from="/" to="/"></Redirect>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
