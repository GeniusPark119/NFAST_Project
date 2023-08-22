import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
// import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import intro41 from "../../assets/Intro_Reseller1.png";
import intro42 from "../../assets/Intro_Reseller2.png";
// import HighLight from "../commons/HighLight";

export default function SellerIntro4() {
  return (
    <ProfilBox>
      <ContentBox>
        <Text>
          <TitleBox>
            <h4>고객들간의 거래로</h4>
            <h4>가게에 수입이 들어와요!</h4>
          </TitleBox>
          <SubTitleBox>
            <span>한정된 수량의 NFT만 발급해도 </span>
            <span>계속되는 수입을 볼 수 있어요.</span>
          </SubTitleBox>
        </Text>
        <Img>
          <img src={intro41} alt="프로필 이미지" />
          <img src={intro42} alt="프로필 이미지" />
        </Img>
      </ContentBox>
      <MoreContentIconBox>
        <Link to="/introSeller3" style={{ color: "black" }}>
          <KeyboardDoubleArrowDownIcon fontSize="large" />
        </Link>
      </MoreContentIconBox>
    </ProfilBox>
  );
}
const Img = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  img {
    width: 100px;
    height: 160px;
  }
  margin-top: 30px;
`;
const ProfilBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 10%;
  position: relative; /* contact box 고정시키기위해서 */
`;

const contentUpAnimation = keyframes`
  0% {
    -webkit-transform: translateY(50px);
            transform: translateY(50px);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  animation: ${contentUpAnimation} 1s 1 ease-in normal;
`;

const Text = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  h4 {
    font-size: 20px;
    width: 210px;
    margin: 10px 0px;
  }
  span {
    font-size: 15px;
    width: 210px;
    margin-bottom: 3px;
  }
`;

const TitleBox = styled.div`
  animation: ${contentUpAnimation} 0.5s 1 ease-in normal;
  margin-bottom: 10px;
`;
const SubTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${contentUpAnimation} 0.8s 1 ease-in normal;
`;
const downIconAnimation = keyframes`
    0% {
      -webkit-transform: translateY(0);
              transform: translateY(0);
      -webkit-transform-origin: 50% 50%;
              transform-origin: 50% 50%;
      text-shadow: none;
    }
    100% {
      -webkit-transform: translateY(50px);
              transform: translateY(50px);
      -webkit-transform-origin: 50% 50%;
              transform-origin: 50% 50%;
    }
`;
const MoreContentIconBox = styled.div`
  animation-duration: 2s;
  animation-delay: 3s;
  animation-name: ${downIconAnimation};
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;
