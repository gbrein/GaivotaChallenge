import "react-hot-loader/patch";
import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import App from "./App";
import Login from "./routes/login/";

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
