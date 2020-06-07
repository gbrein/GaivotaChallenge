import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

export const Header = props => {
  const { logged, authData, logoff } = props;
  return (
    <Navbar bg="light">
      <Navbar.Brand href="/">
        <img className="logo" src="/logo192.png"></img>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Text className="navbar-item">
          <Link to="/new-farm">Cadastrar Fazenda</Link>
        </Navbar.Text>
        <Navbar.Text className="navbar-item">
          <Link to="/data-upload">Upload de dados</Link>
        </Navbar.Text>
        <Navbar.Text className="navbar-item">
          <Link to="/encript">Encript</Link>
        </Navbar.Text>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {logged ? (
            <div>
              Olá {authData.name} , fazer{" "}
              <button className="button-logoff" onClick={() => logoff()}>
                logoff
              </button>
            </div>
          ) : (
            <a href="/login">Login</a>
          )}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  logged: PropTypes.bool,
  authData: PropTypes.object,
  logoff: PropTypes.func
};
