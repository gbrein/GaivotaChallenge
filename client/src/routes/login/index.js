import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { authenticate } from "../../services/auth";
import { Form, Button } from "react-bootstrap";
import { PropTypes } from "prop-types";

const Login = props => {
  const { history } = props;
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  /**
   * Handle the input change and changes the form state
   * @function handleChange
   * @param {String} key - Form field key
   * @returns {Function} On change event handler
   */
  const handleChange = key => ({ target }) => {
    setLoginForm({ ...loginForm, [key]: target.value });
  };

  /**
   * Submit the login form and handles the response
   * @function handleSubmit
   * @param {Event} e - Submit event
   */
  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    const { email, password } = loginForm;
    try {
      // Here you can store the userData in any way
      await authenticate(email, password);
      history.push("/app/home");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="login-containeer">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange("email")}
            value={loginForm.email}
            type="email"
            placeholder="admin@gaivota.ai"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange("password")}
            value={loginForm.password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="button-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.object
};

export default withRouter(Login);
