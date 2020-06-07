import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getFarm, postFarms } from "../../services/fetch";
import Dropzone from "react-dropzone";

export const EditFarm = props => {
  const { location } = props;
  const { history } = props;
  const [data, setData] = useState({
    farm_id: "",
    name: "",
    latitude: "",
    longitude: "",
    culture: "",
    variety: "",
    total_area: "",
    yield_estimation: "",
    price: ""
  });

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    getFarm(id).then(result => {
      setData(result[0]);
    });
  }, []);

  const handleChange = key => ({ target }) => {
    setData({ ...data, [key]: target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const arr = [];
    arr.push(data);
    postFarms(arr);
    history.push("/new-farm/");
  };

  const dropFile = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const json = JSON.parse(reader.result);
        setData({ ...data, geo_json: json });
      });
      reader.readAsText(file);
    });
  };

  return (
    <div className="login-containeer">
      <Form>
        <Form.Group controlId="formBasic">
          <Form.Control
            type="text"
            name="farm_id"
            placeholder="farm_id"
            value={data.farm_id}
            onChange={handleChange("farm_id")}
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Control
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange("name")}
            placeholder="name"
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Control
            type="text"
            value={data.latitude}
            onChange={handleChange("latitude")}
            name="latitude"
            placeholder="latitude"
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Control
            type="text"
            value={data.longitude}
            onChange={handleChange("longitude")}
            name="longitude"
            placeholder="longitude"
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Control
            type="text"
            value={data.culture}
            onChange={handleChange("culture")}
            name="culture"
            placeholder="culture"
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Control
            type="text"
            value={data.variety}
            onChange={handleChange("variety")}
            name="variety"
            placeholder="variety"
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Control
            type="text"
            name="total_area"
            value={data.total_area}
            onChange={handleChange("total_area")}
            placeholder="total_area"
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Control
            type="text"
            value={data.yield_estimation}
            onChange={handleChange("yield_estimation")}
            name="yield_estimation"
            placeholder="yield_estimation"
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Control
            type="text"
            value={data.price}
            onChange={handleChange("price")}
            name="price"
            placeholder="price"
          />
        </Form.Group>

        <Dropzone onDrop={dropFile}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Clique para adicionar um arguivo GeoJson</p>
              </div>
            </section>
          )}
        </Dropzone>

        <Button onClick={e => handleSubmit(e)} variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

EditFarm.propTypes = {
  location: PropTypes.object,
  history: PropTypes.func
};
