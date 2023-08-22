import React from "react";
// import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/NFast_Logo.png";
import moneylogin from "../../assets/moneylogin.png";
import Metamask from "../../components/loginpage/Metamask";

export default function LoginPage() {
  const theme = createTheme();
  const [open, setOpen] = React.useState(false);

  const handleMetamaskClick = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" m={30}>
        <Box
          sx={{
            marginTop: "140px",
            gap: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img style={{ width: "300px" }} src={logo} alt="" />
          <Typography
            variant="h6"
            sx={{ color: "#5B5299", marginBottom: "20px" }}
          >
            줄서지말고 먹자!
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Metamask
              onClick={handleMetamaskClick}
              disabled={open}
              isSeller={0}
            />
          </div>

          <Button
            variant="contained"
            href="/loginSeller"
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
            비즈니스 계정으로 이용하기
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
