/* eslint-disable no-console */
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { baseUrl as base } from "./url";

// import { getSequence } from "../../storage/Cookie";

// const baseUrl = `https://j8a307.p.ssafy.io/api`;
const baseUrl = `${base}`;
// const userSequence=getSequence();

function getStoreDetail(storeSequence) {
  console.log("나 들어왔어");
  return async (dispatch) => {
    await axios
      .get(`${baseUrl}/main/search-list/store/${storeSequence}`)
      .then((response) => {
        const { data } = response;
        dispatch({ type: "GET_STOREDETAIL_SUCCESS", payload: { data } });
        console.log("RESPONSE DATA ", data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}
function addBookMark(storeSequence, userSequence) {
  console.log("북마크 등록에 진입");
  return async () => {
    await axios
      .post(`${baseUrl}/store/${storeSequence}/bookmark/${userSequence}`)
      .then((response) => {
        const { data } = response;
        console.log("북마크 등록 결과 ", data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}
function removeBookMark(storeSequence, userSequence) {
  console.log("북마크 삭제에 진입");
  return async () => {
    await axios
      .delete(`${baseUrl}/store/${storeSequence}/bookmark/${userSequence}`)
      .then((response) => {
        const { data } = response;
        console.log("북마크 삭제 결과 ", data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}
function isBookMark(storeSequence, userSequence) {
  // console.log("북마크게요 아니게요");
  return async (dispatch) => {
    await axios
      .get(`${baseUrl}/store/${storeSequence}/bookmark/${userSequence}`)
      .then((response) => {
        const { data } = response;
        console.log("북마크 조회 결과 ", data);
        dispatch({ type: "GET_BOOKMARK_SUCCESS", payload: data });
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}
function writeReview(nfastSequence, userSequence, reviews) {
  // const navigate = useNavigate();
  console.log(reviews);
  const data = {
    nfastSequence,
    userSequence,
    reviews,
  };
  console.log(data);
  return async () => {
    const url = `${baseUrl}/review-count/${nfastSequence}`;
    await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        console.log(response);
        // navigate(`/mainPage`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function getPurchaseList(data) {
  return async (dispatch) => {
    await axios
      .post(
        `${baseUrl}/store/${data.storeSequence}/purchase/detail`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
      .then((response) => {
        const { data } = response;
        dispatch({ type: "GET_PURCHASE_LIST_SUCCESS", payload: { data } });
        console.log("RESPONSE DATA ", data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function postPurchase(inputs, amount, userSequence) {
  const data = {
    nfastDate: inputs.nfastDate,
    nfastMealType: inputs.nfastMealType,
    amount,
  };
  console.log("PURCHASE", data);
  return async (dispatch) => {
    await axios
      .post(
        `${baseUrl}/store/${inputs.storeSequence}/${userSequence}/purchase/detail/confirm`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
      .then((response) => {
        const { data } = response;
        dispatch({ type: "GET_PURCHASE_INFO", payload: { data } });
        console.log("RESPONSE DATA ", data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function getNfastPrice(nfastSequence) {
  return async (dispatch) => {
    await axios
      .get(`${baseUrl}/store/${nfastSequence}/sale`)
      .then((response) => {
        const { data } = response;
        dispatch({ type: "GET_NFAST_PRICE", payload: { data } });
        console.log("RESPONSE DATA ", data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function registSell(data) {
  console.log("REGISTSELL", data);
  return async (dispatch) => {
    await axios
      .post(
        `${baseUrl}/store/${data.nfastSequence}/sale`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
      .then((response) => {
        const { data } = response;
        dispatch({ type: "GET_RESELL_NFAST", payload: { data } });
        console.log("REGISTSELLㅣㅣㅣㅣ DATA ", response);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function saveTotalCnt(data) {
  return async (dispatch) => {
    dispatch({ type: "SAVE_TOTALCNT", payload: { data } });
  };
}

function saveAmount(data) {
  return async (dispatch) => {
    dispatch({ type: "SAVE_AMOUNT", payload: { data } });
  };
}

function saveHandler(data) {
  return async (dispatch) => {
    dispatch({ type: "SAVE_HANDLER", payload: { data } });
  };
}

function getNfastUseState(userSequence, nfastSequence) {
  return async (dispatch) => {
    console.log("흠...............");
    await axios
      .get(
        `${baseUrl}/floating-button/confirmation/${userSequence}/${nfastSequence}`
      )
      .then((response) => {
        const { data } = response;
        dispatch({ type: "GET_NFASTUSESTATE_SUCCESS", payload: { data } });
        console.log("RESPONSE DATA ", data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function refundNfast(nfastSequence) {
  return async () => {
    await axios
      .patch(`${baseUrl}/owner/qr/refund/${nfastSequence}`)
      .then((response) => {
        const { data } = response;
        console.log("RESPONSE DATA ", data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

export const storeAction = {
  getStoreDetail,
  addBookMark,
  removeBookMark,
  isBookMark,
  writeReview,
  getPurchaseList,
  saveTotalCnt,
  saveAmount,
  saveHandler,
  postPurchase,
  getNfastUseState,
  getNfastPrice,
  registSell,
  refundNfast,
};
