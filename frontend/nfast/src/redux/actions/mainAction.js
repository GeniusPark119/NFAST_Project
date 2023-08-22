import axios from "axios";
// import {
//   locationLoadSuccess,
//   locationLoadError,
// } from "../../components/storepage/KaKaoMap";
import { baseUrl } from "./url";

// const baseUrl = `http://localhost:8080/api`;
// const baseUrl = `https://j8a307.p.ssafy.io/api`;

// navigator.geolocation.getCurrentPosition((pos) => {
//   const { lat, lng } = locationLoadSuccess(pos);
//   // eslint-disable-next-line
//   console.log("위도와 경도를 받아올까용?", lat, lng);
// }, locationLoadError);

function getDistance(lat, lng) {
  const data = { lat, lng };
  console.log("내 현재위치는,", lat, lng);
  return async (dispatch) => {
    const url = `${baseUrl}/main/distance-recommendation-list`;
    await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        const data = response.data.stores;
        dispatch({ type: "GET_DISTANCE_LIST_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  };
}

function getTrans() {
  return async (dispatch) => {
    const url = `${baseUrl}/main/transaction-recommendation-list`;
    await axios
      .get(url)
      .then((response) => {
        const data = response.data.stores;
        dispatch({ type: "GET_TRANS_LIST_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  };
}

function getFloatingNfast(userSequence) {
  return async (dispatch) => {
    const url = `${baseUrl}/floating-button/${userSequence}`;
    await axios
      .get(url)
      .then((response) => {
        const { data } = response;
        // eslint-disable-next-line
        console.log(data);
        dispatch({ type: "GET_FLOATING_NFAST", payload: { data } });
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log("FLOATING ERROR", error);
      });
  };
}

export const mainAction = {
  getDistance,
  getTrans,
  getFloatingNfast,
};
