/* eslint-disable react/prop-types */
import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AlarmIcon from "@mui/icons-material/Alarm";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HelpIcon from "@mui/icons-material/Help";
// import StoreImg from "../../assets/StoreImage.png";

// import { storeAction } from "../../redux/actions/storeAction";

function StoreInfo(props) {
  // eslint-disable-next-line react/prop-types
  const {
    storeImage,
    storeName,
    storeCategory,
    storeDetail,
    storeLunchStart,
    storeLunchEnd,
    storeDinnerStart,
    storeDinnerEnd,
    storePhone,
    storeInformation,
  } = props;
  // console.log(storeImage);

  return (
    <Wrapper>
      <Img src={storeImage} alt="car!" />
      {/* <Img src={StoreImg} alt="car!" /> */}

      <h2>{storeName}</h2>
      <h5>{storeCategory}</h5>
      {storeDetail === null ? (
        <h5> 등록된 가게 정보가 없습니다.</h5>
      ) : (
        <h5>{storeDetail}</h5>
      )}

      <Info>
        {storeLunchStart === null || storeLunchEnd === null ? (
          <span>
            <AlarmIcon sx={{ fontSize: "large", marginRight: "1%" }} />
            런치타임 &gt; 등록된 시간 정보가 없습니다.
          </span>
        ) : (
          <span>
            <AlarmIcon sx={{ fontSize: "large", marginRight: "1%" }} />
            런치타임 &gt; {storeLunchStart} ~ {storeLunchEnd}
          </span>
        )}
        {storeDinnerStart === null || storeDinnerEnd === null ? (
          <span>
            <AlarmIcon sx={{ fontSize: "large", marginRight: "1%" }} />
            디너타임 &gt; 등록된 시간 정보가 없습니다.
          </span>
        ) : (
          <span>
            <AlarmIcon sx={{ fontSize: "large", marginRight: "1%" }} />
            디너타임 &gt; {storeDinnerStart} ~ {storeDinnerEnd}
          </span>
        )}
        {storeDetail === null ? (
          <span>
            <PhoneIphoneIcon sx={{ fontSize: "large", marginRight: "1%" }} />
            전화번호 &gt; 등록된 가게 번호가 없습니다.
          </span>
        ) : (
          <span>
            <PhoneIphoneIcon sx={{ fontSize: "large", marginRight: "1%" }} />
            전화번호 &gt; {storePhone}
          </span>
        )}
        {storeInformation === null ? (
          <span>
            <HelpIcon sx={{ fontSize: "large", marginRight: "1%" }} />
            사용방법 &gt; 등록된 가게 번호가 없습니다.
          </span>
        ) : (
          <span>
            <HelpIcon sx={{ fontSize: "large", marginRight: "1%" }} />
            사용방법 &gt; {storeInformation}
          </span>
        )}
      </Info>
    </Wrapper>
  );
}

export default StoreInfo;
const Wrapper = styled.div`
  h2 {
    margin-top: 6%;
    margin-left: 2%;
    margin-bottom: 3%;
  }
  h4 {
    margin-bottom: 0;
  }
  h5 {
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 2%;
  }
  @media only screen and (min-width: 320px) and (max-width: 768px) {
    height: auto;
  }
  @media only screen and (min-width: 768px) {
    height: auto;
  }
`;

const Img = styled.img`
  width: 100%;
  @media only screen and (min-width: 320px) and (max-width: 768px) {
    height: auto;
    max-height: 300px;
  }
  @media only screen and (min-width: 768px) {
    height: auto;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 5%;
  span {
    margin-left: 1%;
    font-size: 13px;
    color: #828282;
    display: flex;
    align-items: center;
  }
`;
