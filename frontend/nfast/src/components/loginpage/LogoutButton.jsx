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
          width: "80px",
          height: "30px",
          fontSize: "12px",
          margin: "0px 5px",
        }}
        href="/loginCustomer"
        disableElevation
      >
        로그아웃
      </LoginBtn>
    </Wrapper>
  );
}

export default LoginButton;
