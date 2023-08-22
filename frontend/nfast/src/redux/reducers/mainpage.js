const initialState = {
  storesDistance: [],
  storesTrans: [],
  nfast: "",
  usage: 0,
};
function mainpage(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case "GET_DISTANCE_LIST_SUCCESS":
      //   console.log(payload);
      return { ...state, storesDistance: payload.data };
    case "GET_TRANS_LIST_SUCCESS":
      //   console.log(payload);
      return { ...state, storesTrans: payload.data };
    case "GET_FLOATING_NFAST":
      // eslint-disable-next-line no-console
      console.log(payload.data.nfast);
      return { ...state, nfast: payload.data.nfast };
    case "GET_NFASTUSESTATE_SUCCESS":
      // eslint-disable-next-line no-console
      console.log("====mainReducer===", payload.data.nfastUseState);
      return { ...state, usage: payload.data.nfastUseState };
    default:
      return { ...state };
  }
}
export default mainpage;
