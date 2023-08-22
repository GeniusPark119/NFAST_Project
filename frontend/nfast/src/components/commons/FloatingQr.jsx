import React from "react";
import styled from "styled-components";
// import { publishAction } from "../../redux/actions/publishAction";
import NFastQr from "./NfastQr";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cards = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
`;

function FloatingQr() {
  return (
    <Wrapper>
      <Cards>
        <NFastQr />
      </Cards>
    </Wrapper>
  );
}

export default FloatingQr;
