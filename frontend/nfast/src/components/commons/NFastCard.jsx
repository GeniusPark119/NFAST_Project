/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import styled from "styled-components";
// import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Drawer from "@mui/material/Drawer";
// import Checkbox from "@mui/material/Checkbox";
// import { TextField } from "@mui/material";
// import { QrCode } from "@mui/icons-material";
import { storeAction } from "../../redux/actions/storeAction";
import { getSequence } from "../../storage/Cookie";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Ticket = styled.div`
  position: relative;
  //   종이같은 그림자
  &:before {
    z-index: -1;
    position: absolute;
    content: "";
    bottom: 15px;
    left: 10px;
    width: 50%;
    top: 80%;
    max-width: 300px;
    background: #777;
    -webkit-box-shadow: 0 15px 10px #777;
    -moz-box-shadow: 0 15px 10px #777;
    box-shadow: 0 15px 10px #777;
    -webkit-transform: rotate(-3deg);
    -moz-transform: rotate(-3deg);
    -o-transform: rotate(-3deg);
    -ms-transform: rotate(-3deg);
    transform: rotate(-3deg);
  }
  &:after {
    z-index: -1;
    position: absolute;
    content: "";
    bottom: 15px;
    width: 50%;
    top: 80%;
    max-width: 300px;
    background: #777;
    -webkit-box-shadow: 0 15px 10px #777;
    -moz-box-shadow: 0 15px 10px #777;
    box-shadow: 0 15px 10px #777;
    -webkit-transform: rotate(3deg);
    -moz-transform: rotate(3deg);
    -o-transform: rotate(3deg);
    -ms-transform: rotate(3deg);
    transform: rotate(3deg);
    right: 10px;
    left: auto;
  }
  background-color: whitesmoke;
  border: 3px solid #9f9bb5;
  width: 350px;
  height: 150px;
  border-top: groove 20px #bcb6ff;
  display: flex;
  flex-wrap: wrap;
`;
const Info = styled.div`
  flex: 1;

  width: 150px;
  height: 140px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  & > div:not(:last-child) {
    margin: 6%;
  }
  div {
    font-size: 14px;
  }
`;
const QR = styled.div`
  flex: 1;
  border-left: dashed 2px #bcb6ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyleBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7%;
  Button {
    margin: 2%;
    width: 75px;
    height: 30px;
    background-color: #bcb6ff;
    color: white;
    font-size: 10px;
  }
`;

function NFastCard() {
  const dispatch = useDispatch();
  const floatingNfast = useSelector((state) => state.mainReducer.nfast);

  // console.log(nfastUsage);
  const navigate = useNavigate();
  const {
    storeName,
    nfastDate,
    nfastStartTime,
    nfastEndTime,
    nfastPrice,
    nfastSequence,
  } = floatingNfast;

  const [qrStatus, setQrStatus] = useState(false);
  const [isRefunded, setIsRefunded] = useState(false); // new state variable
  const userSequence = getSequence();

  const nfastUse = useSelector((state) => state.mainReducer.usage);

  const useStateRoute = (nfastSequence) => {
    console.log("======사용확인 누르면?!=====", nfastUse);
    dispatch(storeAction.getNfastUseState(userSequence, nfastSequence));
    // 사용완료 판단여부
    if (nfastUse === 0) {
      // eslint-disable-next-line no-alert
      alert("미사용 NFasT입니다.");
    } else {
      // eslint-disable-next-line no-alert
      alert("사용완료 된 NFasT입니다. 리뷰페이지로 이동합니다.");
      navigate(`/review/${nfastSequence}`);
    }
  };
  const toggleDrawer2 = () => {
    dispatch(storeAction.refundNfast(nfastSequence));
    setIsRefunded(true); // update refund status
    setQrStatus(!qrStatus);
  };
  return (
    <div>
      <Wrapper>
        <Ticket>
          <Info>
            <div>
              {floatingNfast ? (
                <div>
                  <div style={{ margin: "2% 0% 0% 2%" }}>
                    <div
                      style={{
                        marginBottom: "5%",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {storeName}
                    </div>
                    <div>{nfastPrice} ETH</div>
                  </div>
                  <div>
                    <div style={{ margin: "2% 0% 0% 2%" }}>
                      {`${new Date(nfastDate).getFullYear()}.
                ${new Date(nfastDate).getMonth()}.
                ${new Date(nfastDate).getDay()}`}
                    </div>
                    <div style={{ margin: "2% 0% 0% 2%" }}>
                      <span>{nfastStartTime}</span> ~{" "}
                      <span>{nfastEndTime}</span>
                    </div>
                  </div>
                  <div>
                    <StyleBtn>
                      <Button
                        variant="contained"
                        onClick={() => useStateRoute(nfastSequence)}
                      >
                        사용확인
                      </Button>
                      {isRefunded ? (
                        <div>
                          <Button variant="contained" disabled>
                            판매완료
                          </Button>
                        </div>
                      ) : (
                        <Button variant="contained" onClick={toggleDrawer2}>
                          환불하기
                        </Button>
                      )}
                    </StyleBtn>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  예정된 NFT가 없습니다.
                </div>
              )}
            </div>
          </Info>
          {floatingNfast && (
            <QR>
              {!qrStatus ? (
                <QRCode
                  value={JSON.stringify({
                    nfastSequence,
                    type: 1,
                  })}
                  size="100"
                  fgColor="rgba(37, 74, 205, 1)"
                />
              ) : (
                <QRCode
                  value={JSON.stringify({
                    nfastSequence,
                    type: 2,
                  })}
                  size="100"
                  fgColor="rgba(255, 55, 55, 1)"
                />
              )}
            </QR>
          )}
        </Ticket>
      </Wrapper>
      {isRefunded ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "Red",
          }}
        >
          환불 QR 코드를 사장님께 보여주세요!
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
}
NFastCard.defaultProps = {
  storeName: "가게이름",
  nfastDate: "날짜",
  nfastStartTime: "시작시간",
  nfastEndTime: "종료시간",
  nfastPrice: 0,
  nfastQr: "qr",
};

export default NFastCard;
