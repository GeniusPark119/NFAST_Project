/* eslint-disable no-console */
import axios from "axios";
import { baseUrl as base } from "./url";

const baseUrl = `${base}/owner`;

function storeTitle(storeSequence) {
  console.log("storeSequence ", storeSequence);
  return async (dispatch) => {
    await axios
      .get(`${baseUrl}/${storeSequence}/mint`)
      .then((response) => {
        const { data } = response;
        dispatch({ type: "GET_STORETITLE_SUCCESS", payload: { data } });
        console.log("RESPONSE DATA ", data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function getPublishNfastList(storeSequence) {
  return async (dispatch) => {
    const url = `${baseUrl}/${storeSequence}/nfts`;
    await axios
      .get(url)
      .then((response) => {
        const { data } = response;
        dispatch({ type: "GET_PUBLISH_NFASTLIST_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("GET STORE ERROR", error);
      });
  };
}

function getIncomeList(storeSequence) {
  return async (dispatch) => {
    const url = `${baseUrl}/${storeSequence}/incomes`;
    await axios
      .get(url)
      .then((response) => {
        const { data } = response;
        dispatch({ type: "GET_INCOMELIST_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("GET STORE ERROR", error);
      });
  };
}

function checkQR(nfastInfo, storeSequence) {
  const { nfastSequence, type } = JSON.parse(nfastInfo);
  // const nfastSequence = info.nfastSequence;
  // const type = info.type;
  console.log("nfastSequence ", nfastSequence, type);
  return async () => {
    // const url = `http://localhost:8080/api/owner`;
    await axios
      .patch(`${baseUrl}/qr/${storeSequence}/${type}/${nfastSequence}`)
      .then((response) => {
        const { data } = response;
        // dispatch({type: "GET_CHECKQR_SUCCESS", payload: {data}});

        if (data.result === "success") {
          console.log("RESPONSE DATA ", data);
        } else {
          // eslint-disable-next-line no-alert
          alert(data.result);
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function publishNfast(sequence, store) {
  const data = {
    storeSequence: sequence,
    nfastDate: store.date,
    nfastDefaultPrice: store.price,
    nfastStartTime: store.start,
    nfastEndTime: store.end,
    nfastSupply: store.count,
    nfastEigenvalue: store.cid,
    nfastHash: store.nfastHash[0],
    nfastQr: [],
    nfastRefundQr: [],
    nfastMealType: store.time,
    nfastUseState: 0,
    nfastSaleState: 0,
  };
  return async (dispatch) => {
    const url = `${baseUrl}/${sequence}/mint`;
    // const url = `http://localhost:8080/api/owner/${sequence}/mint`;
    await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        console.log(response);
        dispatch({ type: "POST_PUBLISHNFAST_SUCCESS" });
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  };
}

export const publishAction = {
  storeTitle,
  getPublishNfastList,
  getIncomeList,
  checkQR,
  publishNfast,
};
