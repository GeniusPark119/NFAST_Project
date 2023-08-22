/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { toStringByFormatting } from "../../api/transDate";
import { mypageAction } from "../../redux/actions/mypageAction";

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
  width: 380px;
  height: 140px;
  border-top: groove 20px #bcb6ff;
  display: flex;
  flex-wrap: wrap;
`;
const Info = styled.div`
  flex: 1;
  width: 150px;
  height: 100px;
  display: flex;
  justify-contents: center;
  flex-direction: column;
  & > div:not(:last-child) {
    margin: 6%;
  }
`;

const Review = styled.div`
  flex: 1;
  border-left: dashed 2px #bcb6ff;
  display: flex;
  flex-direction: column;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const EachReview = styled.div`
//   flex: 0.5;
//   justify-content: center;
//   text-align: center;
//   align-
//   align-items: center;
//   background-color: rgba(230, 229, 255, 1);
//   // border-radius: 30%;
//   width: 80%;
//   height: 15%;
//   margin-top: 2%;
//   margin-bottom: 2%;
//   font-size: 10pt;
// `;

function PastTicket({
  storeName,
  nfastDate,
  nfastSequence,
  nfastStartTime,
  nfastEndTime,
  nfastPrice,
  nfastReview,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const storeSequence = useSelector(
    (state) => state.mypageReducer.storeSequence
  );
  const handleRevisit = (nfastSequence) => {
    console.log("NNNNNNNNNN", nfastSequence);
    dispatch(mypageAction.getStoreSequence(nfastSequence));
    setFlag(true);
    console.log("hehehehehehey");
  };

  useEffect(() => {
    if (flag) {
      console.log("성공오오오오옹", storeSequence);
      setFlag(false);
      navigate(`/store/${storeSequence}`);
    }
  }, [storeSequence]);

  return (
    <Wrapper>
      <Ticket>
        <Info>
          <div>
            <span>{storeName}</span>
            <span>{nfastPrice} ETH</span>
          </div>
          <div>
            <span>{toStringByFormatting(new Date(nfastDate))}</span>
            <div>
              <span>{nfastStartTime}</span>
              <span>{nfastEndTime}</span>
            </div>
          </div>
          <div>
            <Button
              sx={{
                backgroundColor: "#bcb6ff",
                borderRadius: "50px",
                color: "white",
                width: "90px",
                height: "30px",
                fontSize: "10px",
                margin: "0px 5px",
                "&:hover": {
                  backgroundColor: "#5B5299",
                  color: "white",
                },
              }}
              variant="contained"
              onClick={() => handleRevisit(nfastSequence)}
            >
              재방문
            </Button>
          </div>
        </Info>
        <Review>{nfastReview}</Review>
      </Ticket>
    </Wrapper>
  );
}
PastTicket.defaultProps = {
  storeName: "가게이름",
  nfastSequence: 1,
  nfastDate: "날짜",
  nfastStartTime: "0",
  nfastEndTime: "0",
  nfastPrice: 0,
  nfastReview: ["시간 리뷰", "편의시설 리뷰", "서비스 리뷰", "분위기 리뷰"],
};

PastTicket.propTypes = {
  storeName: PropTypes.string,
  nfastSequence: PropTypes.number,
  nfastDate: PropTypes.string,
  nfastStartTime: PropTypes.string,
  nfastEndTime: PropTypes.string,
  nfastPrice: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  nfastReview: PropTypes.object,
};

export default PastTicket;
