import React, { useRef, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
// import Intro1 from "./CustomerIntro1";
import Intro2 from "../../components/customerintropage/CustomerIntro2";
import Intro3 from "../../components/customerintropage/CustomerIntro3";
import Intro4 from "../../components/customerintropage/CustomerIntro4";
import ProgressBar from "../../components/commons/ProgressBar";
import MovePageBtn from "../../components/commons/MovePageBtn";
// import ContentsWrapper from "../../components/commons/ContentsWrapper";
// import {
//   MovePageBtn,
//   ContentsWrapper,
//   Footer,
//   ProgressBar,
//   SideBar,
// } from "./components";

const GlobalStyles = createGlobalStyle`
  html {
    --color-main: #BCAFD4;
    --color-main-dark: #6C509F;
    --color-back: #efefef;
    --color-back-light: #F9F9F9;
    --color-back-dark: #DCDCDC;
    --color-detail-back : #f4f4f4;
    a {
      color: var(--color-main-dark);
      text-decoration-line: none;
    }
  }
`;
const OuterPageBox = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export default function IntroducePage() {
  const OuterPageBoxRef = useRef();
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const wheelHandler = () => {
      const { scrollTop } = OuterPageBoxRef.current;
      if (scrollTop > 0) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    const boxRefCurrent = OuterPageBoxRef.current;
    boxRefCurrent.addEventListener("scroll", wheelHandler);
    return () => {
      boxRefCurrent.removeEventListener("scroll", wheelHandler);
    };
  }, []);
  const handleClick = () => {
    // eslint-disable-next-line
    console.log("clicked");
    OuterPageBoxRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <GlobalStyles />
      <OuterPageBox ref={OuterPageBoxRef}>
        <ProgressBar OuterPageBoxRef={OuterPageBoxRef} />
        {/* <Intro1 /> */}
        <Intro2 />
        <Intro3 />
        <Intro4 />
        {showTopBtn && <MovePageBtn handleClick={handleClick} />}
        {/* <Footer /> */}
      </OuterPageBox>
    </>
  );
}
