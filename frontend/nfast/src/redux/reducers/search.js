const initialState = {
  searchList: [],
  searchLinkStore: "",
};

function searchReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case "GET_SEARCH_LIST_SUCCESS":
      return { ...state, searchList: payload.data.stores };
    default:
      return { ...state };
  }
}

// fuction searchStoreReducer(state = initialState , action={}) {
// const {type , payload} = action;
// switch (type){
//   case "GET_STORE_DETAIL":
//     return {...state,searchLinkStore:payload.data.s}
// }

// }

export default searchReducer;
