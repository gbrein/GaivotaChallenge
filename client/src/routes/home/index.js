import React, { useState, useEffect } from "react";
import { HomeContaineer } from "../../components/HomeContaineer";
import {
  getFarms,
  getFarm,
  getNdvi,
  getPreciptation
} from "../../services/fetch";

const Home = () => {
  const [selectedFarm, setSelectedFarm] = useState("");
  const [farms, setFarms] = useState([]);
  const [idFarm, setIdFarm] = useState("");
  const [ndvi, setNdvi] = useState({});
  const [preciptation, setPreciptation] = useState({});
  const [dataMap, setDataMap] = useState({
    latitude: -23.5489,
    longitude: -46.6388,
    culture: "",
    variety: "",
    yield_estimation: "",
    total_area: "",
    price: "",
    name: "",
    farm_id: ""
  });

  useEffect(() => {
    getFarms().then(result => setFarms(result));
    getPreciptation().then(result => setPreciptation(result));
    getNdvi().then(result => setNdvi(result));
  }, []);

  useEffect(() => {
    if (idFarm !== "") {
      getFarm(idFarm).then(result => setSelectedFarm(...result));
    }
  }, [idFarm]);

  useEffect(() => {
    if (selectedFarm !== "") {
      setDataMap(selectedFarm);
    }
  }, [selectedFarm]);

  return (
    <div>
      <HomeContaineer
        ndvi={ndvi}
        preciptation={preciptation}
        dataMap={dataMap}
        setIdFarm={setIdFarm}
        farms={farms}
      />
    </div>
  );
};

export default Home;
