import React from "react";
import "assets/sass/styles.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from "pages/Layout";
import { Provider } from "react-redux";
import store from "store/index";

function App() {
  localStorage.removeItem('currentTime')
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
