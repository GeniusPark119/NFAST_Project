import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
// import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import intro from "../../assets/intro.png";
// import NFastLogo from "../../assets/NFast_Logo.png";
import ticket from "../../assets/ticket2.png";
import text from "../../assets/text.png";
// import HighLight from "../commons/HighLight";

export default function IntroCustomer1() {
  return (
    <ProfilBox>
      <ContentBox>
        <Img>
          <img src={intro} alt="프로필 이미지" />
        </Img>

        <Text>
          <TextImg>
            <img src={text} alt="프로필 이미지" />
          </TextImg>
          <OnImg>
            <img src={ticket} alt="프로필 이미지" />
          </OnImg>
          <SubTitleBox>
            <span style={{ color: "white" }}>NFasT와 시작하기</span>
          </SubTitleBox>
        </Text>
        <MoreContentIconBox>
          <Link to="/introCustomer2" style={{ color: "white" }}>
            <KeyboardDoubleArrowDownIcon fontSize="large" />
          </Link>
        </MoreContentIconBox>
      </ContentBox>
    </ProfilBox>
  );
}

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
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${contentUpAnimation} 1s 1 ease-in normal;
`;
const Text = styled.div`
  position: absolute; // add absolute positioning to the text
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  width: 100%;
  h4 {
    font-size: 20px;
    width: 145px;
    margin: 5px;
  }
  span {
    font-size: 15px;
    width: 200px;
    margin-bottom: 3px;
  }
`;
const Img = styled.div`
  width: 412px;
  height: 850px;
  display: flex;
  justify-content: flex-start;

  img {
    width: 100%;
  }
`;
const TextImg = styled.div`
  width: 50%;
  height: 15%;
  margin-top: 180px;
  margin-left: 40px;
  display: flex;
  justify-content: flex-start;

  img {
    width: 100%;
  }
`;
const OnImg = styled.div`
  margin-top: 35px;
  margin-left: 90px;
  width: 50%;
  height: 15%;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
  }
`;
const ProfilBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
// const TitleBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   animation: ${contentUpAnimation} 0.5s 1 ease-in normal;
//   h4 {
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-end;
//     font-color: rgb(0, 0, 0);
//   }
// `;
const SubTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 290px;
  font-color: rgb(0, 0, 0);
  span {
    width: 100%;
    font-color: rgb(0, 0, 0);
    text-align: center;
  }
  animation: ${contentUpAnimation} 0.8s 1 ease-in normal;
`;

const MoreContentIconBox = styled.div`
  position: absolute; // add absolute positioning to the text
  //   top: 0;
  //   left: 0;
  //   right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  bottom: 0;
`;
