import React from "react";
import styled, { keyframes } from "styled-components";
import intro1 from "../../assets/Intro1_Seller.png";

const ProfilBox = styled.div`
  height: 1vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 60% 10%;
`;

const contentUpAnimation = keyframes`
  0% {
    -webkit-transform: translateY(25px);
            transform: translateY(25px);
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
  width: 100%;

  h4 {
    font-size: 20px;
    width: 180px;
    margin: 10px 0px;
  }
  span {
    font-size: 15px;
    width: 150px;
    margin-top: 7px;
  }
`;
const Img = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  img {
    width: 200px;
    height: 200px;
  }
`;
const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${contentUpAnimation} 1s 1 ease-in normal;
`;

const TitleBox = styled.div`
  margin-bottom: 10px;
  animation: ${contentUpAnimation} 0.5s 1 ease-in normal;
`;
const SubTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${contentUpAnimation} 0.8s 1 ease-in normal;
`;

export default function SellerIntro1() {
  return (
    <ProfilBox>
      <ContentBox>
        <Text>
          <TitleBox>
            <h4>음식에 대한 값</h4>
            <h4>제대로 받고 있나요?</h4>
          </TitleBox>
          <SubTitleBox>
            <span>줄 서서 먹는 맛집</span>
            <span>그 기다림의 가치는</span>
            <span> 과연 얼마일까요?</span>
          </SubTitleBox>
        </Text>
        <Img>
          <img src={intro1} alt="" />
        </Img>
      </ContentBox>
    </ProfilBox>
  );
}
