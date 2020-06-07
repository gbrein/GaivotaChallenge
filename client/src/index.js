import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./Root";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";
import "leaflet/dist/leaflet.css";

const root = document.getElementById("root");

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  root
);

if (module.hot) {
  module.hot.accept("./Root", () => {
    const NewRoot = require("./Root").default;
    render(
      <AppContainer>
        <NewRoot />
      </AppContainer>,
      root
    );
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
