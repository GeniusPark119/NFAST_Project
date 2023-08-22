import React from "react";
// import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
// import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
// import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import intro2 from "../../assets/Intro2_Seller.png";
// import HighLight from "../commons/HighLight";

export default function CustomerIntro1() {
  return (
    <ProfilBox>
      <ContentBox>
        <Text>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Img>
              <img src={intro2} alt="프로필 이미지" />
            </Img>
            <TitleBox>
              <h4>NFasT로</h4>
              <h4>입장은 빠르게</h4>
              <h4>만족은 높게</h4>
            </TitleBox>
          </div>
        </Text>
      </ContentBox>
      {/* <MoreContentIconBox>
        <Link to="/introSeller2" style={{ color: "black" }}>
          <KeyboardDoubleArrowDownIcon fontSize="large" />
        </Link>
      </MoreContentIconBox> */}
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${contentUpAnimation} 1s 1 ease-in normal;
`;
const Text = styled.div`
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
  margin-top: 10%;
  width: 20%;
  display: flex;
  justify-content: flex-start;
  img {
    width: 110px;
    height: 200px;
  }
`;

const ProfilBox = styled.div`
  // height: 10vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0% 10%;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40%;
  animation: ${contentUpAnimation} 0.5s 1 ease-in normal;
  h4 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;
// const SubTitleBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 10px;
//   span {
//     width: 100%;
//     text-align: end;
//   }
//   animation: ${contentUpAnimation} 0.8s 1 ease-in normal;
// `;
