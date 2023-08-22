const initialState = {
  storeTitle: "",
  nfastList: [],
  incomeList: [],
};
function publishReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case "GET_STORETITLE_SUCCESS":
      return { ...state, storeTitle: payload };
    case "GET_PUBLISH_NFASTLIST_SUCCESS":
      return { ...state, nfastList: payload.data.nfasts };
    case "GET_INCOMELIST_SUCCESS":
      return { ...state, incomeList: payload.data.incomes };
    default:
      return { ...state };
  }
}
export default publishReducer;
