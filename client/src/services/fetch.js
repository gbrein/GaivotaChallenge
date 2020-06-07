import axios from "axios";
const uri = "http://localhost:5000";

export const postFarms = data => {
  axios.post(uri + "/new-farms", data).then(res => res);
};

export const getFarms = () => {
  return axios.get(uri + "/farms").then(res => {
    return res.data;
  });
};

export const getFarm = id => {
  return axios.get(uri + "/farm/" + id).then(res => {
    return res.data;
  });
};

export const removeFarm = id => {
  return axios.delete(uri + "/farm/", { params: { id } }).then(res => {
    return res.data;
  });
};

export const postGeo = (id, data) => {
  axios.post(uri + "/geo/" + id, data).then(res => res);
};

export const postcsv = (url, data) => {
  return axios.post(uri + url, data).then(res => {
    return res.data;
  });
};

export const getNdvi = () => {
  return axios.get(uri + "/ndvi").then(res => {
    return res.data[res.data.length - 1].ndvi;
  });
};

export const getPreciptation = () => {
  return axios.get(uri + "/preciptation").then(res => {
    return res.data[res.data.length - 1].prec;
  });
};

export const encript = data => {
  return axios.post(uri + "/encript/" + data).then(res => res);
};

export const decript = data => {
  return axios.post(uri + "/decript/", { data }).then(res => res);
};
