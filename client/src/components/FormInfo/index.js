import React from "react";
import PropTypes from "prop-types";
import { Card, Form } from "react-bootstrap";

export const FormInfo = props => {
  const { farms, setIdFarm, dataMap } = props;
  const handleChange = e => {
    const id = e.target[event.target.selectedIndex].id;
    setIdFarm(id);
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>Farm Name</Card.Title>
        <Form>
          <Form.Control type="search" placeholder="Search" />
          <Form.Group>
            <br />
            <Form.Control onChange={handleChange} as="select">
              <option>Selecione a Fazenda</option>
              {// eslint-disable-next-line
              farms.map((element, idx) => (
                <option key={idx} id={element.farm_id}>
                  {element.name}
                </option>
              ))}
            </Form.Control>
            <br />
          </Form.Group>
        </Form>
        <Card.Text>Culture: {dataMap.culture}</Card.Text>
        <Card.Text>Variety: {dataMap.variety}</Card.Text>
        <Card.Text>Area: {dataMap.total_area}</Card.Text>
        <Card.Text>
          Yield estimation: {dataMap.yield_estimation} ton/ha
        </Card.Text>
        <Card.Text>
          Total: {dataMap.total_area * dataMap.yield_estimation}
        </Card.Text>
        <Card.Text>Price: {dataMap.price}</Card.Text>
        <Card.Link href="#">Buy Now</Card.Link>
        <Card.Link href="#">Bid</Card.Link>
      </Card.Body>
    </Card>
  );
};

FormInfo.propTypes = {
  farms: PropTypes.array,
  setIdFarm: PropTypes.func,
  dataMap: PropTypes.object
};
