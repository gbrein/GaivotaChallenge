import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Maps } from "../Maps";
import { FormInfo } from "../FormInfo";

export const HomeContaineer = props => {
  const { dataMap, farms, setIdFarm, preciptation } = props;
  // const [labels, setLabels] = useState([]);
  // eslint-disable-next-line
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (preciptation.arr) {
      setDataset(preciptation.arr[0].data);
    }
    console.log(dataset);
  }, [preciptation]);

  return (
    <div>
      <div className="containeer-home">
        <div className="custom-col">
          <Maps dataMap={dataMap} />
        </div>
        <div className="custom-col">
          <FormInfo dataMap={dataMap} farms={farms} setIdFarm={setIdFarm} />
        </div>
      </div>
      {dataset !== "" ? <div className="chart-container"></div> : false}
    </div>
  );
};

HomeContaineer.propTypes = {
  dataMap: PropTypes.object,
  preciptation: PropTypes.object,
  ndvi: PropTypes.object,
  farms: PropTypes.array,
  setIdFarm: PropTypes.func
};
