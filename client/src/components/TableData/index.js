import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeFarm } from "../../services/fetch";

export const TableData = props => {
  const { tableHeader, tableData, isLoading, history } = props;
  if (isLoading === true) {
    return <div></div>;
  }
  const uploadGeoJson = () => {
    //fetch GeoJson
    return true;
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    removeFarm(id);
    history.push("/new-farms");
  };

  return (
    <Table>
      <thead>
        <tr>
          {tableHeader !== undefined ? (
            tableHeader.map((item, idx) =>
              idx === 0 || idx === 1 || idx == 11 ? (
                false
              ) : (
                <th key={idx}>{item}</th>
              )
            )
          ) : (
            <th></th>
          )}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((element, key) => (
          <tr key={key}>
            {element.map((subElement, idx) => (
              <td key={idx}>
                {subElement === false ? (
                  <form onSubmit={uploadGeoJson}>
                    <input type="file" id="myFile" name="filename" />
                    <input type="submit" />
                  </form>
                ) : (
                  subElement
                )}
              </td>
            ))}
            <td>
              <Link to={`/edit-farm/${element[0]}`}>Editar</Link>
              &nbsp; &nbsp;
              <button onClick={e => handleDelete(e, element[0])}>
                Deletar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

TableData.propTypes = {
  tableData: PropTypes.array,
  tableHeader: PropTypes.array,
  isLoading: PropTypes.bool,
  history: PropTypes.func
};
