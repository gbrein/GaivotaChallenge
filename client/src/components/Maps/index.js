import React from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, GeoJSON } from "react-leaflet";

export const Maps = props => {
  const { dataMap } = props;
  const geoJSONStyle = () => {
    return {
      color: "#1f2021",
      weight: 1,
      fillOpacity: 0.5,
      fillColor: "#fff2af"
    };
  };
  return (
    <Map center={[dataMap.latitude, dataMap.longitude]} zoom={15}>
      <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <GeoJSON
        key={dataMap.farm_id}
        data={dataMap.geo_json}
        style={geoJSONStyle}
      />
    </Map>
  );
};
Maps.propTypes = {
  dataMap: PropTypes.object
};
