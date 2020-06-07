import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { encript, decript } from "../../services/fetch";
import NumericInput from "react-numeric-input";

export const Encript = () => {
  const [formData, setFormData] = useState({
    encript: "0",
    hash: "",
    decript: ""
  });

  /**
   * Handle the input change and changes the form state
   * @function handleChange
   * @param {String} key - Form field key
   * @returns {Function} On change event handler
   */
  const handleChange = key => ({ target }) => {
    setFormData({ ...formData, [key]: target.value });
  };

  const handleEncript = e => {
    e.preventDefault();
    encript(formData.encript).then(res =>
      setFormData({ ...formData, hash: res.data })
    );
  };

  const handleDecript = e => {
    e.preventDefault();
    decript(formData.hash).then(res =>
      setFormData({ ...formData, encript: res.data })
    );
  };

  return (
    <div className="login-containeer">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Encript id</Form.Label>
          <NumericInput
            className="form-control"
            onChange={e => setFormData({ ...formData, encript: e })}
            type="number"
            maxLength={8}
            value={formData.encript}
            placeholder=""
          />
          <Form.Text className="text-muted"></Form.Text>
          <Form.Label>Hash</Form.Label>
          <Form.Control
            onChange={handleChange("hash")}
            value={formData.hash}
            type="text"
            placeholder=""
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <div className="button-center">
          <Button variant="primary" onClick={handleEncript}>
            Encript
          </Button>
        </div>
        <br /> <br />
        <div className="button-center">
          <Button variant="primary" onClick={handleDecript}>
            Decript
          </Button>
        </div>
      </Form>
    </div>
  );
};
