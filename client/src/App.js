import React, { useState, useEffect } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "./services/auth";
import { PropTypes } from "prop-types";
import { Header } from "./components/Header";
import Home from "./routes/home/";
import { NewFarm } from "./routes/NewFarm";
import { EditFarm } from "./routes/EditFarm";
import { DataUpload } from "./routes/DataUpload";
import { Encript } from "./routes/Encript";
const App = props => {
  const { location, match, history } = props;
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authData, setAuthData] = useState({});

  /**
   * Authenticates user and set state variables
   * @function authUser
   */

  useEffect(() => {
    isAuthenticated()
      .then(res => {
        setLogged(true);
        setLoading(false);
        setAuthData(res);
      })
      .catch(() => {
        setLogged(false);
        setLoading(true);
        history.push("/login");
      });
  }, []);

  if (loading) return null;

  const isRoot =
    location.pathname === "" ||
    location.pathname === "/" ||
    location.pathname === "/app" ||
    location.pathname === "/app/";

  if (!logged && location.pathname.indexOf("login") === -1) {
    return <Redirect to="/login" />;
  }

  if (isRoot) {
    return <Redirect to="/app/home" />;
  }

  const logoff = () => {
    logout();
    history.push("/login");
  };
  return (
    <div className="App">
      <Header logged={logged} authData={authData} logoff={logoff} />
      <Route path={`${match.url}app/home`} component={Home} />
      <Route path="/new-farm" component={NewFarm} />
      <Route path="/data-upload" component={DataUpload} />
      <Route path="/edit-farm" component={EditFarm} />
      <Route path="/encript" component={Encript} />
    </div>
  );
};

App.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(App);
