/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
import LoginBtn from "../loginpage/LoginButton";
import HeaderSeller from "./HeaderSeller";
// import LoginSellerBtn from "../loginpage/LoginButtonSeller";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import NFastLogo from "../../assets/NFast_Logo.png";

// eslint-disable-next-line import/named
import { getSequence } from "../../storage/Cookie";

function Header() {
  const [checkLogin, setCheckLogin] = useState(false);

  // const isLoggedIn = useSelector((state) => state.authReducer.isLogin);
  const userInfo = useSelector((state) => state.mypageReducer.userInfo);
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  useEffect(() => {
    const seq = getSequence();
    if (seq) {
      setCheckLogin(true);
    }
  }, [isLogin]);

  console.log("USERRRRRRR", userInfo);

  // 세션에서 로그인 정보 확인
  // useEffect(() => {
  //   const session = getSession();
  //   if (session) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, []);

  // Redux store에 저장된 로그인 여부 값 업데이트
  useEffect(() => {
    console.log("userINFOOOOOo", userInfo);
  }, [userInfo]);

  // 사장님 페이지의 Header
  if (window.location.pathname === "/PageSeller") return <HeaderSeller />;
  // 로그인 페이지의 Header
  // 소비자페이지 로그인한 상태와 안한상태
  return (
    <AppBar
      elevation={0}
      position="relative"
      variant="outlined"
      style={{
        backgroundColor: "transparent",
        height: "80px",
        boxShadow: "none",
        maxWidth: "412px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: "80px",
            display: "flex",
            justifyContents: "space-between",
          }}
        >
          {/* 로고 */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              // marginLeft: "10%",
            }}
          >
            <Box component={Link} to="/mainPage">
              {/* 로고이미지가 나와야되는데? */}
              <img src={NFastLogo} alt="logo" height="40px" />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                // marginLeft: "10%",
              }}
            >
              {checkLogin && <SearchBar />}
            </Box>
          </Box>
          <div style={{ display: "flex", alignItems: "center" }}>
            {checkLogin ? <SideBar /> : <LoginBtn />}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
