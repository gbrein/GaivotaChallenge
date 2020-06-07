import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import PropType from "prop-types";
import { CSVReader } from "react-papaparse";
import { TableData } from "../../components/TableData";
import { postFarms, getFarms } from "../../services/fetch";

export const NewFarm = props => {
  const [tableHeader, setTableHeader] = useState();
  const [tableData, setTableData] = useState();
  const [fetchData, setFetchData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState("");
  const { history } = props;

  const handleOnDrop = data => {
    const indexes = data.slice(0, 1)[0].data;
    const dataExtract = data.slice(1, data.length - 1);
    let jsonObject = {};
    dataExtract.forEach((element, idx) => {
      let eachData = element.data;
      let count = 0;
      let jsonSubObject = {};
      eachData.forEach(subElement => {
        const key = indexes[count];
        jsonSubObject = {
          ...jsonSubObject,
          [key]: subElement
        };
        count++;
      });
      jsonSubObject = {
        ...jsonSubObject,
        ["GeoJSON"]: false
      };
      jsonObject = {
        ...jsonObject,
        [idx]: jsonSubObject
      };
    });
    setPostData(jsonObject);
  };

  useEffect(() => {
    setFetchData("");
    getFarms().then(result => setFetchData(result));
  }, []);

  useEffect(() => {
    if (fetchData !== undefined && fetchData !== "") {
      setTableHeader(Object.keys(fetchData[0]));
      let arrayData = Object.values(fetchData);
      let newArrayData = [];
      arrayData.forEach(element => {
        const newObj = {
          farm_id: element.farm_id,
          name: element.name,
          latitude: element.latitude,
          longitude: element.longitude,
          culture: element.culture,
          variety: element.variety,
          total_area: element.total_area,
          yield_estimation: element.yield_estimation,
          price: element.price
        };
        newArrayData.push(Object.values(newObj));
      });
      setTableData(newArrayData);
      setIsLoading(false);
    }
  }, [fetchData]);

  const handleOnError = err => {
    console.error(err);
  };

  const handleOnRemoveFile = data => {
    console.error(data);
  };

  const postCsv = e => {
    e.preventDefault();
    postFarms(postData);
    history.push("/new-farm");
  };

  return (
    <div>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        noDrag
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Clique para fazer upload de uma lista de fazendas</span>
      </CSVReader>
      <br />
      <br />{" "}
      <div className="button-center">
        <Button variant="primary" type="submit" onClick={postCsv}>
          Save
        </Button>
      </div>
      <br />
      <br />
      <TableData
        tableHeader={tableHeader}
        history={history}
        tableData={tableData}
        isLoading={isLoading}
      />
    </div>
  );
};

NewFarm.propTypes = {
  history: PropType.func
};
