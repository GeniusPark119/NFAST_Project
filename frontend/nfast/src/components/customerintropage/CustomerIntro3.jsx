import React from "react";
import styled, { keyframes } from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
// import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import introOne from "../../assets/Intro_Reseller1.png";
import introTwo from "../../assets/Intro_Reseller2.png";
// import HighLight from "../commons/HighLight";

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

const Text = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    font-size: 20px;
    width: 170px;
  }
  span {
    font-size: 16px;
    width: 200px;
    margin-bottom: 10px;
  }
`;
const ContentBox = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  animation: ${contentUpAnimation} 1s 1 ease-in normal;
  margin-bottom: 20px;
`;
const Img = styled.div`
  img {
    width: 60px;
    height: 120px;
  }
`;
const ProfilBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 10%;
  margin-top: 50px;
`;
const TitleBox = styled.div`
  font-size: 1.4rem;
  line-height: 1rem;
  z-index: 1;
  animation: ${contentUpAnimation} 0.5s 1 ease-in normal;
`;
const SubTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  line-height: 0.8rem;
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
  margin-top: 50px;
  margin-bottom: 20px;
  // animation-duration: 2s;
  // animation-delay: 3s;
  // animation-name: ${downIconAnimation};
  // animation-iteration-count: infinite;
  // animation-direction: alternate;
`;

export default function CustomerIntro3() {
  return (
    <ProfilBox>
      <ContentBox>
        <Text>
          <TitleBox>
            <h4>못구해도 괜찮다!</h4>
            <h4>사고 팔면 되니까~</h4>
          </TitleBox>
          <SubTitleBox>
            <span>구매한 NFasT는</span>
            <span>개인간의 거래가 가능해요!</span>
          </SubTitleBox>
        </Text>
        <Img>
          <img src={introOne} alt="프로필 이미지" />
        </Img>
        <Img>
          <img src={introTwo} alt="프로필 이미지" />
        </Img>
      </ContentBox>
      <MoreContentIconBox>
        <KeyboardDoubleArrowDownIcon fontSize="large" />
      </MoreContentIconBox>
    </ProfilBox>
  );
}
