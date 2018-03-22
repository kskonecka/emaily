import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, {}, compose(applyMiddleware(reduxThunk), window.devToolsExtension ? window.devToolsExtension() : (f) => f));

// <Provider /> is a react component that makes the {store} accessible to every component in the app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
