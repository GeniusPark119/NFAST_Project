/* eslint-disable no-console */
const initialState = {
  storedetail: "",
  purchaseList: [],
  bookmark: null,
  totalCnt: "",
  amount: "",
  flag: "",
  purchaseInfo: [],
  nfastPrice: "",
  resellNfast: "",
};
function storepage(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case "GET_STOREDETAIL_SUCCESS":
      return { ...state, storedetail: payload.data.detail };
    case "GET_PURCHASE_LIST_SUCCESS":
      return { ...state, purchaseList: payload.data.nfasts };
    case "GET_BOOKMARK_SUCCESS":
      console.log("GET_BOOKMARK_SUCCESS", payload.bookmark);
      return { ...state, bookmark: payload.bookmark };
    case "SAVE_TOTALCNT":
      return { ...state, totalCnt: payload.data };
    case "SAVE_AMOUNT":
      return { ...state, amount: payload.data };
    case "SAVE_HANDLER":
      return { ...state, flag: payload.data };
    case "GET_PURCHASE_INFO":
      console.log("PLAYOD", payload);
      return { ...state, purchaseInfo: payload.data.nfasts };
    case "GET_NFAST_PRICE":
      console.log("SSSSSSSSSSSSSSSSSSSS", payload.data);
      return { ...state, nfastPrice: payload.data.nfastPrice };
    case "GET_RESELL_NFAST":
      console.log("ddddddddddd", payload.data);
      return { ...state, resellNfast: payload.data.nfast };
    default:
      return { ...state };
  }
}
export default storepage;
