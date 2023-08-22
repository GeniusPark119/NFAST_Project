/* eslint-disable no-console */
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getSession = () => {
  console.log("쿠키에서 세션 가져오기");
  const accessToken = cookies.get("jwtAccessToken");
  const refreshToken = cookies.get("jwtRefreshToken");
  const sequence = cookies.get("sequence");

  // 토큰이 없거나 만료된 경우
  if (!accessToken) {
    console.log("Access token is expired or not exists");
    return null;
  }

  // 쿠키에 로그인 정보가 없는 경우
  if (!refreshToken || !sequence) {
    console.log("No refresh token or sequence in cookies");
    return null;
  }

  return { accessToken, refreshToken, sequence };
};

export const setAccessToken = (accessToken) => {
  const today = new Date();
  const expireDate = today.setHours(today.getHours() + 1);

  return cookies.set("jwtAccessToken", accessToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
    HttpOnly: true,
  });
};

export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setHours(today.getHours() + 10);
  return cookies.set("jwtRefreshToken", refreshToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
    HttpOnly: true,
  });
};

export const setSequence = (sequence) => {
  const today = new Date();
  const expireDate = today.setHours(today.getHours() + 10);
  return cookies.set("sequence", sequence, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const getAccessToken = () => {
  console.log("access 쿠키 가져오기");
  return cookies.get("jwtAccessToken");
};

export const getRefreshToken = () => {
  console.log("refresh 쿠키 가져오기");
  return cookies.get("jwtRefreshToken");
};

export const getSequence = () => {
  console.log("쿠키에서 유저아이디 발급");
  return cookies.get("sequence");
};

export const removeAccessToken = () => {
  return cookies.remove("jwtAccessToken", { sameSite: "strict", path: "/" });
};

export const removeRefreshToken = () => {
  return cookies.remove("jwtRefreshToken", { sameSite: "strict", path: "/" });
};

export const removeSequence = () => {
  return cookies.remove("sequence", { sameSite: "strict", path: "/" });
};
