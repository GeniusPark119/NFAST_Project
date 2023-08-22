import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useMediaQuery } from "@mui/material";
import FloatingBtn from "./components/commons/FloatingBtn";
import IntroSeller1 from "./pages/seller/IntroSeller1";
import IntroSeller2 from "./pages/seller/IntroSeller2";
import IntroSeller3 from "./pages/seller/IntroSeller3";
import NFastCard from "./components/commons/NFastCard";
import SellerRegister from "./components/sellerintropage/SellerRegister";
import Review from "./pages/customer/ReviewPage";
import MyNftPage from "./pages/customer/MyNftPage";
import MyTransPage from "./pages/customer/MyTransPage";
import MyBookmarkPage from "./pages/customer/MyBookmarkPage";
import MainPage from "./pages/customer/MainPage";
import DisAllPage from "./pages/customer/DisAllPage";
import TransAllPage from "./pages/customer/TransAllPage";
import MyInfoPage from "./pages/customer/MyInfoPage";
import StorePage from "./pages/customer/StorePage";
import LoginCustomer from "./pages/customer/LoginPageCustomer";
import LoginSeller from "./pages/seller/LoginPageSeller";
import SellerPage from "./pages/seller/SellerPage";
import Header from "./components/commons/Header";
import HeaderSeller from "./components/commons/HeaderSeller";
import IntroCustomer1 from "./pages/customer/IntroCustomer1";
import IntroCustomer2 from "./pages/customer/IntroCustomer2";
import IntroCustomer3 from "./pages/customer/IntroCustomer3";
// import Footer from "./components/commons/Footer";

const Pages = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  @media (max-width: 412px) {
    width: 100%;
    max-width: 412px;
  }
`;
function App() {
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("URL Check");
    if (window.location.href.indexOf("Seller") !== -1) {
      setFlag(false);
    }
  }, [window.location.href]);

  return (
    <Wrapper>
      <BrowserRouter>
        {flag ? <Header /> : <HeaderSeller />}
        <Pages>
          <Routes>
            <Route path="/" element={<IntroCustomer1 />} />
            <Route path="/introCustomer2" element={<IntroCustomer2 />} />
            <Route path="/introCustomer3" element={<IntroCustomer3 />} />
            <Route path="/mainPage" element={<MainPage />} />
            <Route path="/disall" element={<DisAllPage />} />
            <Route path="/transall" element={<TransAllPage />} />
            {/* <Route path="/mainPage" element={<MainPage />} /> */}
            <Route path="/floating" element={<FloatingBtn />} />
            <Route path="/nFastCard" element={<NFastCard />} />
            <Route path="/review/:nfastSequence" element={<Review />} />
            <Route path="/mynft" element={<MyNftPage />} />
            <Route path="/mytrans" element={<MyTransPage />} />
            <Route path="/mybookmark" element={<MyBookmarkPage />} />
            <Route path="/myinfo" element={<MyInfoPage />} />
            <Route path="/store/:storeSequence" element={<StorePage />} />
            <Route path="/loginCustomer" element={<LoginCustomer />} />
            <Route path="/loginSeller" element={<LoginSeller />} />

            <Route path="/introSeller1" element={<IntroSeller1 />} />
            <Route path="/introSeller2" element={<IntroSeller2 />} />
            <Route path="/introSeller3" element={<IntroSeller3 />} />
            <Route path="/PageSeller" element={<SellerPage />} />
            <Route path="/RegisterSeller" element={<SellerRegister />} />
          </Routes>
        </Pages>
        {/* <Footer /> */}
      </BrowserRouter>
    </Wrapper>
  );
}
export default App;
