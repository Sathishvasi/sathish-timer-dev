import React from "react";
import "assets/sass/styles.scss";
import Layout from "pages/Layout";
import { Provider } from "react-redux";
import store from "store/index";

function App() {
  return (
    <Provider store={store}>
      <Layout></Layout>
    </Provider>
  );
}

export default App;