import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

const StyleBtn = styled.div`
  margin: 17%;
  Button {
    width: 120px;
    height: 50px;
    background-color: #bcb6ff;
    color: white;
    font-size: 20px;
  }
`;

function BtnPurple() {
  <StyleBtn>
    <Button variant="contained">수정</Button>
  </StyleBtn>;
}

export default BtnPurple;
