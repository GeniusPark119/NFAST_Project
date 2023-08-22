import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
// import { Link } from "react-router-dom";
// import FloatingQr from "./FloatingQr";
import NFastQr from "./NfastQr";

const FloatingAnimation = keyframes`
0% {
  transform: translateY(0%);	
}
50% {
  transform: translateY(6%);	
}	
100% {
  transform: translateY(0%);
}	
`;

const Floating = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${FloatingAnimation} 2s linear easein;
`;
const Cards = styled.div`
  display: ${(props) => props.isDisplay};
`;

const Btn = styled.button`
  width: 70px;
  height: 70px;
  background-color: #5b5299;
  color: white;
  animation: ${FloatingAnimation} 2s linear infinite;
  opacity: 90%;
  font-size: 20px;
  border: none;
  border-radius: 50px;
  position: fixed;
  bottom: 40px;
  right: 30px;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  display: ${(props) => props.isDisplay};
  z-index: 0; /* set a higher z-index than the floating element */
`;
function FloatingBtnSeller() {
  const [floating, setFloating] = useState("none");

  const handleClick = () => {
    if (floating === "none") {
      setFloating("auto");
    } else {
      setFloating("none");
    }
  };
  return (
    <div>
      <Overlay isDisplay={floating === "auto" ? "auto" : "none"} />
      <Floating isFloating={floating}>
        <Cards isDisplay={floating}>
          <NFastQr />
        </Cards>
      </Floating>
      <Btn type="button" onClick={handleClick}>
        QR
      </Btn>
      {/* <Link to="/nFastCard">Go to NFastCard</Link>
      <Link to="/review">Go to review</Link> */}
    </div>
  );
}

export default FloatingBtnSeller;
