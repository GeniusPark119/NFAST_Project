import React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  alignitems: center;
`;

function LoginButton() {
  return (
    <Wrapper>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "white",
          border: "solid 1px #5B5299",
          borderRadius: "50px",
          color: "#5B5299",
          width: "70px",
          height: "30px",
          fontSize: "10px",
          margin: "0px 5px",
          "&:hover": {
            backgroundColor: "#5B5299",
            color: "white",
          },
        }}
        href="/loginCustomer"
        disableElevation
      >
        로그인
      </Button>
    </Wrapper>
  );
}

export default LoginButton;
