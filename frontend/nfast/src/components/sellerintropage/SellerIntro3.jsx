import React from "react";
import styled, { keyframes } from "styled-components";
import intro3 from "../../assets/Intro3_Seller.png";

export default function SellerIntro3() {
  return (
    <ProfilBox>
      <ContentBox>
        <Img>
          <img src={intro3} alt="" />
        </Img>
        <Text>
          <TitleBox>
            <h4>우선권을 구매한</h4>
            <h4>특별한 손님만이 </h4>
            <h4>이용할 수 있어요</h4>
          </TitleBox>
          <SubTitleBox>
            <span>NFasT 서비스의 품질을 위해</span>
            <span>발행 수의 제한이 있어요</span>
            <span>이쯤에서, </span>
            <span>수익에 대한 의문이 드시나요?</span>
          </SubTitleBox>
        </Text>
      </ContentBox>
    </ProfilBox>
  );
}
const Img = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  img {
    width: 230px;
    height: 160px;
  }
`;
const ProfilBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${contentUpAnimation} 1s 1 ease-in normal;
`;
const Text = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 30px;
  h4 {
    font-size: 20px;
    width: 200px;
    margin: 5px 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  span {
    font-size: 15px;
    width: 200px;
    margin: 3px 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const TitleBox = styled.div`
  animation: ${contentUpAnimation} 0.5s 1 ease-in normal;
  display: flex;
  flex-direction: column;
`;
const SubTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${contentUpAnimation} 0.8s 1 ease-in normal;
`;
