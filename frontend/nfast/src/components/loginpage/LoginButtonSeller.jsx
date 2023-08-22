import React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  alignitems: center;
`;
const LoginBtn = styled(Button)`
  margin-right: 20px;
  background-color: #ff9e45;
  &:hover {
    background-color: #ffb800;
  }
`;
function LoginButton() {
  return (
    <Wrapper>
      <LoginBtn
        variant="contained"
        sx={{
          backgroundColor: "#BCB6FF",
          width: "100px",
          height: "30px",
          fontSize: "10px",
          margin: "0px 5px",
        }}
        href="/loginSeller"
        disableElevation
      >
        사장님 로그인
      </LoginBtn>
    </Wrapper>
  );
}

export default LoginButton;
