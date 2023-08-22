import React from "react";
import styled from "styled-components";
// import { useSelector } from "react-redux";
import NFastCard from "./NFastCard";
// import FloatingCodePen from "./FloatingCodePen";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Cards = styled.div`
  width: 380px;
  height: 300px;
  // border: solid 1px #5b5299;
  border-radius: 30%,
  color: #5b5299;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  border-radius: 30;
  position: fixed;
  top: 300px;
`;
function FloatingCards() {
  // const floatingNfast = useSelector((state) => state.mainReducer.nfast);

  // check if any of the values are null
  // if (
  //   !floatingNfast ||
  //   Object.values(floatingNfast).some((value) => value == null)
  // ) {
  //   return <div>예정된 NFT가 없습니다.</div>;
  // }
  return (
    <Wrapper>
      <Cards>
        <span style={{ marginBottom: 30 }}>최근 예정 NFT</span>
        <NFastCard />
        {/* <FloatingCodePen /> */}
      </Cards>
    </Wrapper>
  );
}

export default FloatingCards;
