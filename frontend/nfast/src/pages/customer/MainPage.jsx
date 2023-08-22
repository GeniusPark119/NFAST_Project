import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DepartureBoardTwoToneIcon from "@mui/icons-material/DepartureBoardTwoTone";
import RecordVoiceOverTwoToneIcon from "@mui/icons-material/RecordVoiceOverTwoTone";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import DistanceCard from "../../components/mainpage/DistanceCard";
import TransCard from "../../components/mainpage/TransCard";
import FloatingBtn from "../../components/commons/FloatingBtn";
import { getAccessToken, getSequence } from "../../storage/Cookie";
import { mainAction } from "../../redux/actions/mainAction";
import { mypageAction } from "../../redux/actions/mypageAction";
import Footer from "../../components/commons/Footer";
// import FloatingCodePen from "../../components/commons/FloatingCodePen";

// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";

function MainPage() {
  const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.authReducer.isLogin);
  useEffect(() => {
    // eslint-disable-next-line
    console.log(getAccessToken());

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // eslint-disable-next-line
        console.log("Latitude:", position.coords.latitude);
        // eslint-disable-next-line
        console.log("Longitude:", position.coords.longitude);
        const { latitude, longitude } = position.coords;
        dispatch(mainAction.getDistance(latitude, longitude));
        dispatch(mainAction.getTrans());
      },
      (error) => {
        // eslint-disable-next-line
        console.log(error);
      }
    );
  }, [getAccessToken]);

  useEffect(() => {
    dispatch(mypageAction.getUserInfo(getSequence()));
  }, []);

  const distanceList = useSelector((state) => state.mainReducer.storesDistance);
  // eslint-disable-next-line
  console.log(distanceList);

  const transList = useSelector((state) => state.mainReducer.storesTrans);
  // eslint-disable-next-line no-console
  console.log(transList);

  return (
    <div>
      <Section>
        <Line>
          <Title>
            <DepartureBoardTwoToneIcon />
            <p>거리순</p>
          </Title>
          <Sub>
            <span>가까운 거리의 맛집들을 빠르게!</span>
            <Link to="/disall" style={{ color: "black" }}>
              <span
                style={{
                  float: "right",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                전체 보기 <KeyboardDoubleArrowRightIcon />
              </span>
            </Link>
          </Sub>
        </Line>
        <Card>
          <DistanceCard distanceList={distanceList} />
        </Card>
      </Section>
      <Section>
        <Line>
          <Title>
            <RecordVoiceOverTwoToneIcon />
            <p>거래순</p>
          </Title>
          <Sub>
            <span>최신 많은 거래가 있는 맛집들을 빠르게!</span>
            <Link to="/transall" style={{ color: "black" }}>
              <span
                style={{
                  float: "right",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                전체 보기 <KeyboardDoubleArrowRightIcon />
              </span>
            </Link>
          </Sub>
        </Line>
        <Card>
          <TransCard transList={transList} />
        </Card>
      </Section>
      <Footer />
      <FloatingBtn>Floating</FloatingBtn>
      {/* <FloatingCodePen /> */}
    </div>
  );
}

export default MainPage;

const Section = styled.div`
  margin-top: 10px;
  margin-bottom: 50px;
`;
const Line = styled.div`
  margin-left: 3%;
  margin-right: 3%;
  text-align: center;
  p {
    font-size: 1.1rem;
  }
  span {
    font-size: 0.9rem;
  }
`;
const Card = styled.div`
  margin: 3%;
`;
const Sub = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;

  align-items: center;
`;
