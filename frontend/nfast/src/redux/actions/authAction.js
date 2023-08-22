/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import axios from "axios";
import Alert from "@mui/material/Alert";
import { baseUrl } from "./url";
import {
  setAccessToken,
  setRefreshToken,
  setSequence,
  removeAccessToken,
  removeRefreshToken,
  removeSequence,
} from "../../storage/Cookie";
// import jwtDecode from "jwt-decode";

// import { apiInstance } from "../../api/index";
// const baseUrl = `http://localhost:8080/api`;
// const baseUrl = `https://j8a307.p.ssafy.io/api`;

// const api = apiInstance();

function walletLogin(wallet) {
  console.log("WALLET LOGIN ", wallet);
  const data = {
    wallet,
  };
  return async () => {
    const url = `http://localhost:8080/api/login`;
    await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        const { data } = response;
        console.log("RESPONSE DATA ", data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}

function onLogout(wallet) {
  console.log("로그아웃요청", wallet);
  const data = {
    wallet,
  };
  return async (dispatch) => {
    const url = `${baseUrl}/logout`;
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/logout?userId=${id}`;
    await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then(() => {
        // window.sessionStorage.removeItem("isLogin");
        dispatch({ type: "SET_IS_LOGIN", payload: false });
        dispatch({ type: "SET_IS_VALID_TOKEN", payload: false });
        dispatch({ type: "SET_IS_LOGIN_ERROR", payload: false });
        removeAccessToken(null);
        removeRefreshToken(null);
        removeSequence(null);
      })
      .catch((error) => {
        console.log("로그아웃에러", error);
      });
  };
}

// function resetToken(refreshtoken, userId) {
//   let data = {
//     userId: userId,
//     refreshToken: refreshtoken,
//   };
//   console.log("리셋토큰데이터", data);
//   return async (dispatch, getstate) => {
//     let url = `${baseUrl}/users/refresh`;
//     // let url = `http://i8a508.p.ssafy.io:8080/api/v1/users/refresh`
//     let response = await axios
//       .post(url, JSON.stringify(data), {
//         headers: {
//           "Content-Type": "application/json;charset=utf-8",
//         },
//       })
//       .then((response) => {
//         let data = response.data;
//         let accesstoken = data["jwt-auth-token"];
//         dispatch({ type: "POST_RESETTOEKN_SUCCESS", payload: { data } });
//       })
//       .catch((error) => {
//         console.log("토큰리셋인증에러", error);
//       });
//   };
// }

function userConfirm(wallet) {
  const inputs = {
    wallet,
  };
  return async (dispatch) => {
    const url = `${baseUrl}/login`;
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/login`;
    await axios
      .post(url, JSON.stringify(inputs), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        if (data.result === "success") {
          // window.sessionStorage.setItem("isLogin", true);
          console.log("SUCCESS in");
          const { jwtAuthToken, jwtRefreshToken, sequence } = data;
          dispatch({ type: "SET_IS_LOGIN", payload: true });
          dispatch({ type: "SET_IS_VALID_TOKEN", payload: true });
          dispatch({ type: "SET_IS_LOGIN_ERROR", payload: false });
          dispatch({ type: "GET_USER_INFO_SUCCESS", payload: sequence });

          setAccessToken(jwtAuthToken);
          setRefreshToken(jwtRefreshToken);
          setSequence(sequence);
        } else if (data.result === "fail") {
          // eslint-disable-next-line react/react-in-jsx-scope
          // <Alert severity="success">아이디와 비밀번호를 확인하세요.</Alert>;
          console.log("FAIL in");
          dispatch({ type: "SET_IS_LOGIN", payload: false });
          dispatch({ type: "SET_IS_VALID_TOKEN", payload: false });
          dispatch({ type: "SET_IS_LOGIN_ERROR", payload: true });
          alert("고객 계정으로 전환해주세요.");
        }
      })
      .catch((error) => {
        // eslint-disable-next-line react/react-in-jsx-scope
        <Alert severity="success">아이디와 비밀번호를 확인하세요.</Alert>;
        console.log("userConfirm Error", error);
      });
  };
}

function storeConfirm(wallet) {
  const inputs = {
    wallet,
  };
  return async (dispatch) => {
    const url = `${baseUrl}/owner/login`;
    await axios
      .post(url, JSON.stringify(inputs), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        const { data } = response;
        if (data.result === "success") {
          const { jwtAuthToken, jwtRefreshToken, sequence } = data;
          dispatch({ type: "SET_IS_LOGIN", payload: true });
          dispatch({ type: "SET_IS_VALID_TOKEN", payload: true });
          dispatch({ type: "SET_IS_LOGIN_ERROR", payload: false });
          console.log(data);
          dispatch({ type: "GET_USER_INFO_SUCCESS", payload: sequence });

          setAccessToken(jwtAuthToken);
          setRefreshToken(jwtRefreshToken);
          setSequence(sequence);
          console.log("SUCCESS");
        } else if (data.result === "check") {
          // eslint-disable-next-line react/react-in-jsx-scope
          <Alert severity="success">아이디와 비밀번호를 확인하세요.</Alert>;
          dispatch({ type: "SET_IS_LOGIN", payload: false });
          dispatch({ type: "SET_IS_VALID_TOKEN", payload: false });
          dispatch({ type: "SET_IS_LOGIN_ERROR", payload: true });
          console.log("가게 로그인 check, 가게 등록하러 가기");
        } else if (data.result === "fail") {
          dispatch({ type: "SET_IS_LOGIN", payload: false });
          dispatch({ type: "SET_IS_VALID_TOKEN", payload: false });
          dispatch({ type: "SET_IS_LOGIN_ERROR", payload: true });
          alert("가게 계정으로 전환해주세요.");
        }
      })
      .catch((error) => {
        // eslint-disable-next-line react/react-in-jsx-scope
        <Alert severity="success">아이디와 비밀번호를 확인하세요.</Alert>;
        console.log("userConfirm Error", error);
      });
  };
}

function storeRegister(storeWallet, store) {
  const inputs = {
    storeWallet,
    storeAddress: store.storeAddress,
    storeInfoNumber: store.storeInfoNumber,
    storeImage: store.storeImage,
  };
  console.log(inputs);
  return async (dispatch) => {
    const url = `${baseUrl}/owner/introduction-store/application`;
    await axios
      .post(url, JSON.stringify(inputs), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        const { data } = response;
        if (data.result === "success") {
          const { jwtAuthToken, jwtRefreshToken, sequence } = data;
          dispatch({ type: "SET_IS_LOGIN", payload: true });
          dispatch({ type: "SET_IS_VALID_TOKEN", payload: true });
          dispatch({ type: "SET_IS_LOGIN_ERROR", payload: false });

          dispatch({ type: "GET_USER_INFO_SUCCESS", payload: sequence });

          setAccessToken(jwtAuthToken);
          setRefreshToken(jwtRefreshToken);
          setSequence(sequence);
          console.log("SUCCESS");
        } else {
          // eslint-disable-next-line react/react-in-jsx-scope
          <Alert severity="success">아이디와 비밀번호를 확인하세요.</Alert>;
          dispatch({ type: "SET_IS_LOGIN", payload: false });
          dispatch({ type: "SET_IS_VALID_TOKEN", payload: false });
          dispatch({ type: "SET_IS_LOGIN_ERROR", payload: true });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line react/react-in-jsx-scope
        <Alert severity="success">아이디와 비밀번호를 확인하세요.</Alert>;
        console.log("userConfirm Error", error);
      });
  };
}

// function getUserInfo(token) {
//   console.log("OOOO", token);
//   let decodeToken = jwtDecode(token);
//   // console.log("2. getUserInfo() decodeToken :: ", decodeToken);
//   return async (dispatch) => {
//     let url = `${baseUrl}/users/${decodeToken.userId}`;
//     api.defaults.headers["jwt-auth-token"] = token;
//     let response = await api
//       .get(url)
//       .then((response) => {
//         let data = response.data.userId;
//         console.log(data);
//         dispatch({ type: "GET_USER_INFO_SUCCESS", payload: { data } });
//       })
//       .catch(async (error) => {
//         console.log("getUser", error);
//       });
//   };
// }

// function tokenRegeneration(refreshtoken, userId) {
//   let data = {
//     userId: userId,
//     refreshToken: refreshtoken,
//   };
//   console.log("리셋토큰데이터", data);
//   return async (dispatch, getstate) => {
//     let url = `${baseUrl}/users/refresh`;
//     // let url = `http://i8a508.p.ssafy.io:8080/api/v1/users/refresh`
//     let response = await axios
//       .post(url, JSON.stringify(data), {
//         headers: {
//           "Content-Type": "application/json;charset=utf-8",
//         },
//       })
//       .then((response) => {
//         let data = response.data;
//         let accesstoken = data["jwt-auth-token"];
//         dispatch({ type: "POST_RESETTOEKN_SUCCESS", payload: { data } });
//       })
//       .catch((error) => {
//         console.log("토큰리셋인증에러", error);
//       });
//   };
// }

export const authAction = {
  onLogout,
  walletLogin,
  userConfirm,
  storeConfirm,
  storeRegister,
};
