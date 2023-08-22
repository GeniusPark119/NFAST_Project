import React from "react";
// import styled from "styled-components";
// import Avatar from "@mui/material/Avatar";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Metamask from "../../components/loginpage/Metamask";
import moneylogin from "../../assets/moneylogin.png";
import business from "../../assets/business.png";

const theme = createTheme();

export default function LoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" m={30}>
        <Box
          sx={{
            marginTop: 10,
            gap: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={business} alt="" style={{ width: 300, height: 300 }} />
          <Typography
            variant="h6"
            sx={{ color: "#5B5299", marginBottom: "10px" }}
          >
            쉽고 빠른 수익을 만나보세요!
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Metamask isSeller={1} />
          </div>
          <Button
            variant="contained"
            href="/introSeller1"
            sx={{
              backgroundColor: "#BCB6FF",
              color: "white",
              width: "260px",
            }}
            disableElevation
          >
            <img
              src={moneylogin}
              alt=""
              style={{ width: "30px", height: "30px", margin: "3%" }}
            />
            소개글 보러가기
          </Button>
          <Link
            to="/loginCustomer"
            style={{
              textDecoration: "none",
              color: "black",
              marginBottom: "30px",
            }}
            onClick={() => {
              window.location.href = "/loginCustomer";
            }}
          >
            손님으로 연동하기
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
