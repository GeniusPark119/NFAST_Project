import React from "react";
import styled, { keyframes } from "styled-components";
import Intro5 from "../../assets/Intro5_Seller.png";

export default function SellerIntro5() {
  return (
    <ProfilBox>
      <ContentBox>
        <Text>
          <TitleBox>
            <h4>NFasT를 이용하는</h4>
            <h4>사장님들의</h4>
            <h4>평균 수입이에요!</h4>
          </TitleBox>
          <SubTitleBox>
            <span>하루 평균</span>
            <span>= 2825.15 Eth 수익이 발생해요 </span>
          </SubTitleBox>
        </Text>
        <Img>
          <img src={Intro5} alt="프로필 이미지" />
        </Img>
      </ContentBox>
    </ProfilBox>
  );
}
const Img = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 10px 0px;
  img {
    width: 200px;
    height: 100px;
    opacity: 80%;
  }
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${contentUpAnimation} 1s 1 ease-in normal;
`;

const Text = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 40px 0px;
  h4 {
    font-size: 20px;
    width: 170px;
    margin: 10px 0px;
  }
  span {
    font-size: 15px;
    width: 220px;
    margin-bottom: 3px;
  }
`;

const TitleBox = styled.div`
  animation: ${contentUpAnimation} 0.5s 1 ease-in normal;
`;
const SubTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${contentUpAnimation} 0.8s 1 ease-in normal;
`;
