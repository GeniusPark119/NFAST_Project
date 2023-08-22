/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
// import Drawer from "@mui/material/Drawer";
import NFastLogo from "../../assets/HeaderLogo.png";
import { authAction } from "../../redux/actions/authAction";

function HeaderSeller() {
  const [checkInfo, setCheckInfo] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(authAction.onLogout());
    return navigate("/loginSeller");
  };
  const storeInfo = useSelector((state) => state.mypageReducer.storeInfo);
  const isLogin = useSelector((state) => state.authReducer.isLogin);

  useEffect(() => {
    console.log("Store INFOOOOOOOOOO", storeInfo);
    setCheckInfo(storeInfo);
  }, [storeInfo]);
  console.log(checkInfo);
  return (
    <AppBar
      elevation={0}
      variant="outlined"
      style={{
        maxWidth: "412px",
        position: "relative",
        backgroundColor: "transparent",
        height: "80px",
        boxShadow: "none",
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
            {isLogin ? (
              <Box component={Link} to="/PageSeller">
                {/* 로고이미지가 나와야되는데? */}
                <img src={NFastLogo} alt="logo" height="20px" />
              </Box>
            ) : (
              <Box component={Link} to="/loginSeller">
                {/* 로고이미지가 나와야되는데? */}
                <img src={NFastLogo} alt="logo" height="20px" />
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                // marginLeft: "10%",
              }}
            >
              {" "}
            </Box>
          </Box>
          {isLogin ? (
            <div>
              <Button
                sx={{
                  backgroundColor: "white",
                  border: "solid 1px #5B5299",
                  borderRadius: "50px",
                  color: "#5B5299",
                  width: "80px",
                  height: "30px",
                  fontSize: "10px",
                  margin: "0px 5px",
                  "&:hover": {
                    backgroundColor: "#5B5299",
                    color: "white",
                  },
                }}
                type="submit"
                variant="contained"
                disableElevation
                onClick={() => logout()}
              >
                로그아웃
              </Button>
            </div>
          ) : (
            <div> </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderSeller;

// HeaderSeller.propTypes = {
//   userInfo: PropTypes.string.isRequired,
// };
