import React, { useState } from "react";
import { Button } from "react-bootstrap";
import PropType from "prop-types";
import Dropzone from "react-dropzone";
const csv = require("csvtojson");
// eslint-disable-next-line
import { postcsv } from "../../services/fetch";

// eslint-disable-next-line
export const DataUpload = props => {
  // eslint-disable-next-line
  const [preFormatData, setPreFormatData] = useState("");
  const { history } = props;

  const dropFile = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        csv({
          noheader: true,
          output: "json"
        })
          .fromString(fileAsBinaryString)
          .then(csvRows => {
            const toJson = [];
            csvRows.forEach((aCsvRow, i) => {
              if (i !== 0) {
                const builtObject = {};
                Object.keys(aCsvRow).forEach(aKey => {
                  const valueToAddInBuiltObject = aCsvRow[aKey];
                  let keyToAddInBuiltObject;
                  if (csvRows[0][aKey] === "date") {
                    keyToAddInBuiltObject = csvRows[0][aKey];
                  } else {
                    keyToAddInBuiltObject = csvRows[0][aKey].slice(14);
                  }
                  builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
                });
                toJson.push(builtObject);
              }
            });
            setPreFormatData(chartData(toJson));
          });
      };
      reader.readAsBinaryString(file);
    });
  };

  const chartData = dataJson => {
    let arr = [];
    Object.keys(dataJson[0]).forEach(() => {});

    for (let index = 0; index < Object.keys(dataJson[0]).length; index++) {
      let newItem = {
        id: Object.keys(dataJson[0])[index],
        data: []
      };
      arr.push(newItem);
    }
    arr.pop();
    arr.forEach(newItem => {
      dataJson.forEach(oldItem => {
        let chartCoords = {
          x: oldItem[Object.keys(oldItem)[0]],
          y: oldItem[newItem.id]
        };

        newItem.data.push(chartCoords);
      });
    });
    return { arr, legendY: "", legendX: Object.keys(dataJson[0])[3] };
  };

  const handlePost = (e, i) => {
    e.preventDefault();
    if (i === 1) {
      postcsv("/preciptation", preFormatData).then(() => {
        alert("enviado com sucesso");
        history.push("/");
      });
    }
    if (i === 2) {
      postcsv("/ndvi", preFormatData).then(() => {
        alert("enviado com sucesso");
        history.push("/");
      });
    }
  };

  return (
    <div>
      <Dropzone onDrop={dropFile}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Clique para adicionar um arguivo Preciptation</p>
            </div>
          </section>
        )}
      </Dropzone>
      <br />
      <br />{" "}
      <div className="button-center">
        <Button variant="primary" type="submit" onClick={e => handlePost(e, 1)}>
          Save
        </Button>
      </div>
      <br />
      <br />
      <Dropzone onDrop={dropFile}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Clique para adicionar um arguivo NDVI</p>
            </div>
          </section>
        )}
      </Dropzone>
      <br />
      <br />{" "}
      <div className="button-center">
        <Button variant="primary" type="submit" onClick={e => handlePost(e, 2)}>
          Save
        </Button>
      </div>
    </div>
  );
};

DataUpload.propTypes = {
  history: PropType.func
};
